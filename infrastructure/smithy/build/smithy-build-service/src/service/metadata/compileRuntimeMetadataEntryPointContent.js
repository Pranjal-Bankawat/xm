'use strict';

const assert = require('node:assert');
const { dirname, resolve } = require('node:path');
const collectDataTypes = require('./collectDataTypes');
const collectMetadata = require('./collectMetadata');
const generateService = require('./generateService');
const generateEntityAggregate = require('./generateEntityAggregate');
const generateBusinessObjectModelDescriptor = require('./generateBusinessObjectModelDescriptor');
const { METADATA_DIRECTORY_NAME } = require('./Constant');

const RUNTIME_METADATA_ENTRYPOINT_CONTENT_HEADER = `'use strict';
const $ElsaMetadata = Symbol.for('$ElsaMetadata');
const deepFreeze = require('@sapn/elsa-build-service/util/deepFreeze');
const apis = {};
const apiByPath = {};
const dataTypes = {};
const entityAggregates = {};
const events = {};
const eventsByEntityFullName = {};
const modelDescriptors = {};
const packages = {};
const services = {};
const serviceAdaptations = {};
`;

const RUNTIME_METADATA_ENTRYPOINT_CONTENT_FOOTER = `
module.exports = function plugin(register) {
	register($ElsaMetadata, {
		get apis() {
			return apis;
		},
		get apiByPath() {
			return apiByPath;
		},
		get dataTypes() {
			return dataTypes;
		},
		get entityAggregates() {
			return entityAggregates;
		},
		get events() {
			return events;
		},
		get eventsByEntityFullName() {
			return eventsByEntityFullName;
		},
		get modelDescriptors() {
			return modelDescriptors;
		},
		get packages() {
			return packages;
		},
		get services() {
			return services;
		},
		get serviceAdaptations() {
			return serviceAdaptations;
		}
	});
};
`;

async function compilePackageEntryPointContent(runtimeMetadataEntryPointContent, serviceMetadataFilesPerPackage, metadataEntryPointContentCompilationCallback) {
	const compileEntryPointContentPromises = [];
	for (const [, { packageMetadataTypePath, metadataFiles }] of serviceMetadataFilesPerPackage) {
		compileEntryPointContentPromises.push(
			(async (runtimeMetadataEntryPointContent, packageMetadataTypePath, metadataFiles) => {
				const parsedMetadataFileContent = await collectMetadata(packageMetadataTypePath, metadataFiles);
				parsedMetadataFileContent.forEach(metadata => metadataEntryPointContentCompilationCallback(runtimeMetadataEntryPointContent, metadata));
			})(runtimeMetadataEntryPointContent, packageMetadataTypePath, metadataFiles)
		);
	}
	await Promise.all(compileEntryPointContentPromises);
	return runtimeMetadataEntryPointContent;
}

async function compileAPIPackageEntryPointContent(runtimeMetadataEntryPointContent, serviceMetadataFilesPerPackage) {
	return compilePackageEntryPointContent(runtimeMetadataEntryPointContent, serviceMetadataFilesPerPackage, (runtimeMetadataEntryPointContent, api) => {
		runtimeMetadataEntryPointContent.push(`Object.defineProperty(apis, '${api.fullName}', { enumerable: true, value: deepFreeze(${JSON.stringify(api)}) });`);
		runtimeMetadataEntryPointContent.push(`Object.defineProperty(apiByPath, '${api.apiPath}', { enumerable: true, get: () => apis['${api.fullName}'] });`);
	});
}

async function compileEventPackageEntryPointContent(runtimeMetadataEntryPointContent, serviceMetadataFilesPerPackage) {
	const eventsByEntityFullName = {};
	await compilePackageEntryPointContent(runtimeMetadataEntryPointContent, serviceMetadataFilesPerPackage, (runtimeMetadataEntryPointContent, event) => {
		runtimeMetadataEntryPointContent.push(`Object.defineProperty(events, '${event.fullName}', { enumerable: true, value: deepFreeze(${JSON.stringify(event)}) });`);
		eventsByEntityFullName[event.entityReference] = eventsByEntityFullName[event.entityReference] || new Set();
		eventsByEntityFullName[event.entityReference].add(event.fullName);
	});
	for (const [entityFullName, eventFullNames] of Object.entries(eventsByEntityFullName)) {
		const entries = [];
		for (const eventFullName of eventFullNames) {
			entries.push(`\t'${eventFullName}': { enumerable: true, get: () => events['${eventFullName}'] }`);
		}
		const properties = `{\n${entries.join(',\n')}\n}`;
		runtimeMetadataEntryPointContent.push(
			`Object.defineProperty(eventsByEntityFullName, '${entityFullName}', { enumerable: true, value: Object.defineProperties({}, ${properties}) });`
		);
	}
	return runtimeMetadataEntryPointContent;
}

async function compileServiceAdaptationPackageEntryPointContent(runtimeMetadataEntryPointContent, serviceAdaptationMetadataFilesPerPackage) {
	return compilePackageEntryPointContent(runtimeMetadataEntryPointContent, serviceAdaptationMetadataFilesPerPackage, (runtimeMetadataEntryPointContent, serviceAdaptation) => {
		runtimeMetadataEntryPointContent.push(
			`Object.defineProperty(serviceAdaptations, '${serviceAdaptation.fullName}', { enumerable: true, value: deepFreeze(${JSON.stringify(serviceAdaptation)}) });`
		);
	});
}

async function compileServicePackageEntryPointContent(runtimeMetadataEntryPointContent, serviceMetadataFilesPerPackage) {
	const compileEntryPointContentPromises = [];
	for (const [packageName, { packageMetadataTypePath, metadataFiles }] of serviceMetadataFilesPerPackage) {
		compileEntryPointContentPromises.push(
			(async (runtimeMetadataEntryPointContent, packageMetadataTypePath, metadataFiles) => {
				const [service, ...additionalServices] = await generateService(packageMetadataTypePath, metadataFiles, packageName);
				assert(additionalServices.length === 0, 'Only one service per package is supported');
				const packageMetadata = { name: packageName };
				if (service) {
					runtimeMetadataEntryPointContent.push(
						`Object.defineProperty(services, '${service.fullName}', { enumerable: true, value: deepFreeze(${JSON.stringify(service)}) });`
					);
					packageMetadata.serviceFullName = service.fullName;
				}
				runtimeMetadataEntryPointContent.push(
					`Object.defineProperty(packages, '${packageMetadata.name}', { enumerable: true, value: deepFreeze(${JSON.stringify(packageMetadata)}) });`
				);
			})(runtimeMetadataEntryPointContent, packageMetadataTypePath, metadataFiles)
		);
	}
	await Promise.all(compileEntryPointContentPromises);
	return runtimeMetadataEntryPointContent;
}

async function compileEntityAggregateEntryPointContent(runtimeMetadataEntryPointContent, entityMetadataFilesPerPackage) {
	const compileEntryPointContentPromises = [];
	for (const [, { packageMetadataTypePath, metadataFiles }] of entityMetadataFilesPerPackage) {
		compileEntryPointContentPromises.push(
			(async (runtimeMetadataEntryPointContent, packageMetadataTypePath, metadataFiles) => {
				const entityAggregates = await generateEntityAggregate(packageMetadataTypePath, metadataFiles);
				for (const entityAggregate of entityAggregates) {
					runtimeMetadataEntryPointContent.push(
						`Object.defineProperty(entityAggregates, '${entityAggregate.fullName}', { enumerable: true, value: deepFreeze(${JSON.stringify(entityAggregate)}) });`
					);
				}
			})(runtimeMetadataEntryPointContent, packageMetadataTypePath, metadataFiles)
		);
	}
	await Promise.all(compileEntryPointContentPromises);
	return runtimeMetadataEntryPointContent;
}

async function compileBusinessObjectModelDescriptorEntryPointContent(runtimeMetadataEntryPointContent, boMetadataFilesPerPackage, dataTypes) {
	const compileEntryPointContentPromises = [];
	for (const [, { packageMetadataTypePath, metadataFiles }] of boMetadataFilesPerPackage) {
		compileEntryPointContentPromises.push(
			(async (runtimeMetadataEntryPointContent, packageMetadataTypePath, metadataFiles, dataTypes) => {
				const modelDescriptors = await generateBusinessObjectModelDescriptor(packageMetadataTypePath, metadataFiles, dataTypes);
				for (const modelDescriptor of modelDescriptors) {
					runtimeMetadataEntryPointContent.push(
						`Object.defineProperty(modelDescriptors, '${modelDescriptor.id}', { enumerable: true, value: deepFreeze(${JSON.stringify(modelDescriptor)}) });`
					);
				}
			})(runtimeMetadataEntryPointContent, packageMetadataTypePath, metadataFiles, dataTypes)
		);
	}
	await Promise.all(compileEntryPointContentPromises);
	return runtimeMetadataEntryPointContent;
}

function collectElsaRuntimeDataTypes() {
	const packageMetadataTypePath = dirname(require.resolve('@sapn/elsa-runtime-metadata/datatype/Amount.json'));
	const metadataFiles = [
		'Amount.json',
		'BigInt.json',
		'Binary.json',
		'Boolean.json',
		'Date.json',
		'DateTime.json',
		'Decimal.json',
		'Duration.json',
		'Integer.json',
		'LanguageCode.json',
		'Numeric.json',
		'NumericCharacter.json',
		'Quantity.json',
		'String.json',
		'Text.json',
		'Time.json',
		'UUID_ISO.json'
	];
	return ['@sapn/elsajs', { packageMetadataTypePath, metadataFiles }];
}

async function compileDataTypeEntryPointContent(runtimeMetadataEntryPointContent, dataTypeMetadataFilesPerPackage) {
	const compileEntryPointContentPromises = [];
	const dataTypesFullNameMap = {};
	for (const [, { packageMetadataTypePath, metadataFiles }] of [...dataTypeMetadataFilesPerPackage, collectElsaRuntimeDataTypes()]) {
		compileEntryPointContentPromises.push(
			(async (runtimeMetadataEntryPointContent, packageMetadataTypePath, metadataFiles) => {
				const dataTypes = await collectDataTypes(packageMetadataTypePath, metadataFiles);

				for (const dataType of dataTypes) {
					Object.assign(dataTypesFullNameMap, { [dataType.fullName]: dataType });
					runtimeMetadataEntryPointContent.push(
						`Object.defineProperty(dataTypes, '${dataType.fullName}', { enumerable: true, value: deepFreeze(${JSON.stringify(dataType)}) });`
					);
				}
			})(runtimeMetadataEntryPointContent, packageMetadataTypePath, metadataFiles)
		);
	}
	await Promise.all(compileEntryPointContentPromises);
	return { runtimeMetadataEntryPointContent, dataTypes: dataTypesFullNameMap };
}

module.exports = async function compileRuntimeMetadataEntryPointContent(metadataFilePathsPerPackage) {
	const runtimeMetadataEntryPointContent = [RUNTIME_METADATA_ENTRYPOINT_CONTENT_HEADER];

	const apiMetadataFilesPerPackage = new Map();
	const boMetadataFilesPerPackage = new Map();
	const dataTypeMetadataFilesPerPackage = new Map();
	const entityMetadataFilesPerPackage = new Map();
	const eventMetadataFilesPerPackage = new Map();
	const serviceMetadataFilesPerPackage = new Map();
	const serviceAdaptationMetadataFilesPerPackage = new Map();
	for (const [packageName, { packagePath, metadata = {} }] of Object.entries(metadataFilePathsPerPackage)) {
		for (const [metadataType, metadataFiles] of Object.entries(metadata)) {
			const packageMetadataTypePath = resolve(packagePath, METADATA_DIRECTORY_NAME, metadataType);
			switch (metadataType) {
				case 'api':
					apiMetadataFilesPerPackage.set(packageName, { packageMetadataTypePath, metadataFiles });
					break;
				case 'businessobject':
					boMetadataFilesPerPackage.set(packageName, { packageMetadataTypePath, metadataFiles });
					break;
				case 'datatype':
					dataTypeMetadataFilesPerPackage.set(packageName, { packageMetadataTypePath, metadataFiles });
					break;
				case 'entity':
					entityMetadataFilesPerPackage.set(packageName, { packageMetadataTypePath, metadataFiles });
					break;
				case 'event':
					eventMetadataFilesPerPackage.set(packageName, { packageMetadataTypePath, metadataFiles });
					break;
				case 'service':
					serviceMetadataFilesPerPackage.set(packageName, { packageMetadataTypePath, metadataFiles });
					break;
				case 'serviceadaptation':
					serviceAdaptationMetadataFilesPerPackage.set(packageName, { packageMetadataTypePath, metadataFiles });
					break;
			}
		}
	}
	await compileAPIPackageEntryPointContent(runtimeMetadataEntryPointContent, apiMetadataFilesPerPackage);
	await compileEventPackageEntryPointContent(runtimeMetadataEntryPointContent, eventMetadataFilesPerPackage);
	await compileEntityAggregateEntryPointContent(runtimeMetadataEntryPointContent, entityMetadataFilesPerPackage);
	const { dataTypes } = await compileDataTypeEntryPointContent(runtimeMetadataEntryPointContent, dataTypeMetadataFilesPerPackage);
	await compileBusinessObjectModelDescriptorEntryPointContent(runtimeMetadataEntryPointContent, boMetadataFilesPerPackage, dataTypes);
	await compileServicePackageEntryPointContent(runtimeMetadataEntryPointContent, serviceMetadataFilesPerPackage);
	await compileServiceAdaptationPackageEntryPointContent(runtimeMetadataEntryPointContent, serviceAdaptationMetadataFilesPerPackage);

	runtimeMetadataEntryPointContent.push(RUNTIME_METADATA_ENTRYPOINT_CONTENT_FOOTER);
	return runtimeMetadataEntryPointContent.join('\n');
};
