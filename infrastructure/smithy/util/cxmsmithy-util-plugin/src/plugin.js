'use strict';
const assert = require('node:assert');
const { basename, join, normalize, resolve, sep } = require('node:path');
const { executeSync } = require('@sapn/elsa-util-task');
const getWorkspaces = require('@sapn/elsa-util-workspace/get');
const getWorkspaceRootDirectory = require('@sapn/elsa-util-workspace/getRootDirectory');
const workspaceRootDirectory = getWorkspaceRootDirectory();
const {
	ContentEntityPackageFileAllowPattern,
	MetadataEntityPackageFileAllowPattern,
	MetadataBusinessObjectPackageFileAllowPattern,
	MetadataServiceAdaptationPackageFileAllowPattern
} = require('./Constant');

const MetadataPackageFileBlockListPattern = /([/\\]fixtures|generators[/\\])|(\.metadef\.json$)/;
const PackagePluginMetadataFileAllowPattern = /[/\\]metadata[/\\](analyticalmodel|api|entity|event|eventtopic|mashup|metric|service|serviceadaptation|task|uiview|uiapp)[/\\]/;
const PackagePluginContentFileAllowPattern = /[/\\]content[/\\](text|entity)[/\\]/;

function getElsaPackages() {
	const workspaces = getWorkspaces();
	return Object.values(workspaces).map(({ name, location, context: relativeLocation }) => ({
		name,
		location,
		relativeLocation
	}));
}

function setPackageContentTextDefinitionsLogForTextUuids(textJson, textGroup, packageContentTextDefinitionsLog, packageName, file) {
	const textUuids = Object.keys(textJson[textGroup]);
	textUuids.forEach(textUuid => {
		if (!packageContentTextDefinitionsLog[packageName][textGroup][textUuid]) {
			packageContentTextDefinitionsLog[packageName][textGroup][textUuid] = {};
			packageContentTextDefinitionsLog[packageName][textGroup][textUuid].definitions = [
				{
					value: textJson[textGroup][textUuid].value,
					textFile: file
				}
			];
		} else {
			packageContentTextDefinitionsLog[packageName][textGroup][textUuid].definitions.push({
				value: textJson[textGroup][textUuid].value,
				textFile: file
			});
		}
	});
}

function setPackageContentTextDefinitionsLog(textJson, packageContentTextDefinitionsLog, packageName, file) {
	const textJsonKeys = Object.keys(textJson);
	textJsonKeys.forEach(key => {
		if (key !== 'serviceFullNames') {
			if (!packageContentTextDefinitionsLog[packageName]) {
				packageContentTextDefinitionsLog[packageName] = {};
			}

			const textGroup = key;
			if (!packageContentTextDefinitionsLog[packageName][textGroup]) {
				packageContentTextDefinitionsLog[packageName][textGroup] = {};
			}
			setPackageContentTextDefinitionsLogForTextUuids(textJson, textGroup, packageContentTextDefinitionsLog, packageName, file);
		}
	});
}

function getElsaPackageContentTextDefinitions() {
	const ContentTextPackageFileAllowPattern = /[/\\]content[/\\](text)[/\\][a-zA-Z0-9-]*\.json$/;

	const { code, stdout, stderr } = executeSync('git ls-files', [], {
		cwd: workspaceRootDirectory,
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048
	});
	assert(code === 0, `Runtime Exception: git ls-files failed - ${stderr}`);
	const elsaPackages = getElsaPackages();

	const packageContentTextDefinitionsLog = {};
	for (const line of stdout.trim().split(/[\r\n]+/)) {
		const file = normalize(line.trim());
		let packageName = elsaPackages.find(({ relativeLocation }) => file.startsWith(relativeLocation))?.name;
		if (packageName) {
			packageName = packageName.replace('@sap/', 'sap-').replace('@sapn/', 'sap-n-');
			if (ContentTextPackageFileAllowPattern.test(file)) {
				const textJson = require(resolve(workspaceRootDirectory, file));
				setPackageContentTextDefinitionsLog(textJson, packageContentTextDefinitionsLog, packageName, file);
			}
		}
	}

	return packageContentTextDefinitionsLog;
}

function getElsaPackageContentTextDefinitionsAndUsages() {
	const packageContentTextDefinitionsAndUsagesLog = getElsaPackageContentTextDefinitions();

	const searchItems = [
		{ search: 'descriptionTextId', in: 'application/*/content/entity/*.json' },
		{ search: 'labelTextId', in: 'application/*/metadata/entity/*.json' },
		{ search: 'label', in: 'application/*/metadata/uiview/*.json' },
		{ search: 'pluralLabelTextId', in: 'application/*/metadata/entity/*.json' },
		{ search: 'label', in: 'application/*/metadata/uiapp/*.json' }
	];

	searchItems.forEach(searchItem => {
		const { code, stdout, stderr } = executeSync('grep ' + searchItem.search + ' ' + searchItem.in, [], {
			cwd: workspaceRootDirectory,
			shell: true,
			stdio: 'pipe',
			maxBuffer: 2048 * 2048
		});
		assert(code === 0, `Runtime Exception: grep failed - ${stderr}`);

		for (const line of stdout.trim().split(/[\r\n]+/)) {
			if (line.includes(':')) {
				const lineParts = line.split(':').map(part => part.trim());
				const referencedFile = normalize(lineParts[0]);
				const referenceValue = lineParts[2].replace(/"/g, '').replace(',', '');
				if (referenceValue.includes('.')) {
					const reference = line.replace(lineParts[0] + ':', '').trim();
					const isReuseTextReferenced = referenceValue.startsWith('sap.crm.common.');
					const textGroupAndTextUuid = referenceValue.replace('sap.crm.common.', '').split('.');
					const textGroup = textGroupAndTextUuid[0];
					const textUuid = textGroupAndTextUuid[1];
					const packageName = isReuseTextReferenced ? 'sap-n-common' : referencedFile.split(sep)[1];
					if (
						packageContentTextDefinitionsAndUsagesLog[packageName] &&
						packageContentTextDefinitionsAndUsagesLog[packageName][textGroup] &&
						packageContentTextDefinitionsAndUsagesLog[packageName][textGroup][textUuid]
					) {
						if (!packageContentTextDefinitionsAndUsagesLog[packageName][textGroup][textUuid].usages) {
							packageContentTextDefinitionsAndUsagesLog[packageName][textGroup][textUuid].usages = [
								{
									reference,
									referencedFile
								}
							];
						} else {
							packageContentTextDefinitionsAndUsagesLog[packageName][textGroup][textUuid].usages.push({
								reference,
								referencedFile
							});
						}
					}
				}
			}
		}
	});

	return packageContentTextDefinitionsAndUsagesLog;
}

function extractContentEntityPackageFileContent(fileContent, packageContentLog, relativeFilePath, packageName) {
	const [, , type] = relativeFilePath.match(ContentEntityPackageFileAllowPattern);
	const { fullName, entityReference, serviceFullName, content, anchors } = fileContent;
	packageContentLog[relativeFilePath] = {
		package: packageName,
		type,
		fullName,
		entityReference,
		serviceFullName,
		content,
		anchors
	};
}

function extractContentPackageFileContent(relativeFilePath, packageContentLog, elsaPackages, fileContent) {
	const packageName = elsaPackages.find(({ relativeLocation }) => relativeFilePath.startsWith(relativeLocation))?.name;
	if (packageName && ContentEntityPackageFileAllowPattern.test(relativeFilePath)) {
		fileContent = fileContent || require(resolve(workspaceRootDirectory, relativeFilePath));
		extractContentEntityPackageFileContent(fileContent, packageContentLog, relativeFilePath, packageName);
	}
}

function getElsaPackageContent() {
	const { code, stdout, stderr } = executeSync('git ls-files', [], {
		cwd: workspaceRootDirectory,
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048
	});
	assert(code === 0, `Runtime Exception: git ls-files failed - ${stderr}`);

	const packageContentLog = {};
	const elsaPackages = getElsaPackages();
	for (const line of stdout.trim().split(/[\r\n]+/)) {
		const relativeFilePath = normalize(line.trim());
		extractContentPackageFileContent(relativeFilePath, packageContentLog, elsaPackages);
	}

	return packageContentLog;
}

function createContentMaps(packageContentLog) {
	const contentMaps = {
		absoluteFilePathContentMap: new Map(),
		fullNameContentMap: new Map()
	};

	for (const [relativeFilePath, { ...args }] of Object.entries(packageContentLog)) {
		const absoluteFilePath = resolve(workspaceRootDirectory, relativeFilePath);
		const { fullName } = args;

		contentMaps.absoluteFilePathContentMap.set(absoluteFilePath, { ...args });
		contentMaps.fullNameContentMap.set(fullName, { ...args, relativeFilePath, absoluteFilePath });
	}

	return contentMaps;
}

function extractMetadataEntityPackageFileContent(fileContent, packageMetadataLog, relativeFilePath, packageName) {
	const [, , type] = relativeFilePath.match(MetadataEntityPackageFileAllowPattern);
	const { fullName, name, serviceFullName = fullName } = fileContent;
	packageMetadataLog[relativeFilePath] = {
		package: packageName,
		type,
		fullName,
		name,
		serviceFullName
	};
	const { entityReference, entities, apis, events, eventTopics, analyticalModels, entityType, attributes, anchors, operations } = fileContent;
	switch (type) {
		case 'api':
			packageMetadataLog[relativeFilePath] = {
				...packageMetadataLog[relativeFilePath],
				entityReference,
				operations
			};
			break;
		case 'service':
			packageMetadataLog[relativeFilePath] = {
				...packageMetadataLog[relativeFilePath],
				entities,
				apis,
				events,
				eventTopics,
				analyticalModels
			};
			break;
		case 'entity':
			packageMetadataLog[relativeFilePath] = {
				...packageMetadataLog[relativeFilePath],
				entityType,
				attributes,
				anchors
			};
			break;
		case 'uiview':
			packageMetadataLog[relativeFilePath] = { ...packageMetadataLog[relativeFilePath], anchors };
			break;
	}
}

function extractMetadataBusinessObjectPackageFileContent(fileContent, packageMetadataLog, relativeFilePath, elsaPackages) {
	const [, , type] = relativeFilePath.match(MetadataBusinessObjectPackageFileAllowPattern);
	const { namespace, name } = fileContent;
	const packageName = elsaPackages.find(({ relativeLocation }) => relativeFilePath.startsWith(relativeLocation))?.name;
	packageMetadataLog[relativeFilePath] = {
		package: packageName,
		type,
		namespace,
		name,
		fullName: [namespace, name].join('/')
	};
	if (type === 'businessobject') {
		const { elements, associations, determinations, isRoot, nodes } = fileContent;
		packageMetadataLog[relativeFilePath] = {
			...packageMetadataLog[relativeFilePath],
			elements,
			associations,
			determinations,
			isRoot,
			nodes
		};
	}
	if (type === 'datatype') {
		const { proxyName, representationTerm, implementationType, valueRangeSpecification, elements } = fileContent;
		packageMetadataLog[relativeFilePath] = {
			...packageMetadataLog[relativeFilePath],
			proxyName,
			representationTerm,
			implementationType,
			valueRangeSpecification,
			elements
		};
	}
}

function extractMetadataServiceAdaptationPackageFileContent(fileContent, packageMetadataLog, relativeFilePath, elsaPackages) {
	const [, , type] = relativeFilePath.match(MetadataServiceAdaptationPackageFileAllowPattern);
	const { fullName, binding, elements } = fileContent;
	const packageName = elsaPackages.find(({ relativeLocation }) => relativeFilePath.startsWith(relativeLocation))?.name;
	packageMetadataLog[relativeFilePath] = {
		package: packageName,
		type,
		fullName,
		binding,
		elements
	};
}

function extractMetadataPackageFileContent(relativeFilePath, packageMetadataLog, elsaPackages, fileContent) {
	const packageName = elsaPackages.find(({ relativeLocation }) => relativeFilePath.startsWith(relativeLocation))?.name;
	if (packageName && !MetadataPackageFileBlockListPattern.test(relativeFilePath) && !packageMetadataLog[relativeFilePath]) {
		if (MetadataEntityPackageFileAllowPattern.test(relativeFilePath)) {
			fileContent = fileContent || require(resolve(workspaceRootDirectory, relativeFilePath));
			extractMetadataEntityPackageFileContent(fileContent, packageMetadataLog, relativeFilePath, packageName);
		}
		if (MetadataBusinessObjectPackageFileAllowPattern.test(relativeFilePath)) {
			fileContent = fileContent || require(resolve(workspaceRootDirectory, relativeFilePath));
			extractMetadataBusinessObjectPackageFileContent(fileContent, packageMetadataLog, relativeFilePath, elsaPackages);
		}
		if (MetadataServiceAdaptationPackageFileAllowPattern.test(relativeFilePath)) {
			fileContent = fileContent || require(resolve(workspaceRootDirectory, relativeFilePath));
			extractMetadataServiceAdaptationPackageFileContent(fileContent, packageMetadataLog, relativeFilePath, elsaPackages);
		}
	}
}

function createMetadataMaps(packageMetadataLog) {
	const metadataMaps = {
		absoluteFilePathMetadataMap: new Map(),
		serviceAdaptationMetadataMap: new Map(),
		fullNameMetadataMap: new Map(),
		dataTypeProxyNameUsagesMap: new Map(),
		anchorUsagesMap: new Map()
	};

	for (const [relativeFilePath, { ...args }] of Object.entries(packageMetadataLog)) {
		const absoluteFilePath = resolve(workspaceRootDirectory, relativeFilePath);
		const { fullName, type, proxyName, anchors } = args;

		metadataMaps.absoluteFilePathMetadataMap.set(absoluteFilePath, { ...args });

		if (type === 'serviceadaptation') {
			metadataMaps.serviceAdaptationMetadataMap.set(fullName, { ...args, relativeFilePath, absoluteFilePath });
		} else {
			metadataMaps.fullNameMetadataMap.set(fullName, { ...args, relativeFilePath, absoluteFilePath });
			if (type === 'datatype') {
				const proxyNameUsages = metadataMaps.dataTypeProxyNameUsagesMap.get(proxyName) || [];
				proxyNameUsages.push(relativeFilePath);
				metadataMaps.dataTypeProxyNameUsagesMap.set(proxyName, proxyNameUsages);
			}
			if ((type === 'entity' || type === 'uiview') && anchors) {
				anchors.forEach(anchor => {
					const anchorUsages = metadataMaps.anchorUsagesMap.get(anchor.id) || [];
					anchorUsages.push(relativeFilePath);
					metadataMaps.anchorUsagesMap.set(anchor.id, anchorUsages);
				});
			}
		}
	}

	return metadataMaps;
}

function getElsaPackageMetadata() {
	const { code, stdout, stderr } = executeSync('git ls-files', [], {
		cwd: workspaceRootDirectory,
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048
	});
	assert(code === 0, `Runtime Exception: git ls-files failed - ${stderr}`);

	const packageMetadataLog = {};
	const elsaPackages = getElsaPackages();
	for (const line of stdout.trim().split(/[\r\n]+/)) {
		const relativeFilePath = normalize(line.trim());
		extractMetadataPackageFileContent(relativeFilePath, packageMetadataLog, elsaPackages);
	}

	return packageMetadataLog;
}

function getElsaProvisioningMetadata() {
	const MetadataPackageFileAllowPattern = /[/\\]metadata[/\\](analyticalmodel|api|entity|event|eventtopic|mashup|metric|service|uiview|uiapp)[/\\]/;

	const { code, stdout, stderr } = executeSync('git ls-tree -r HEAD', [], {
		cwd: workspaceRootDirectory,
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048
	});
	assert(code === 0, `Runtime Exception: git ls-tree failed - ${stderr}`);

	const provisionMetadataLog = {};
	for (const line of stdout.trim().split(/[\r\n]+/)) {
		const [, , commitId, gitFile] = line.trim().split(/\s/);
		const file = normalize(gitFile);
		if (MetadataPackageFileAllowPattern.test(file) && !MetadataPackageFileBlockListPattern.test(file)) {
			const { fullName, serviceFullName = fullName } = require(resolve(workspaceRootDirectory, file));
			provisionMetadataLog[serviceFullName] = provisionMetadataLog[serviceFullName] ?? {};
			provisionMetadataLog[serviceFullName][fullName ?? _getFullNameFromFileLocation(getElsaPackages(), file)] = commitId;
		}
	}

	return provisionMetadataLog;
}

function getElsaProvisioningLock() {
	const { code, stdout, stderr } = executeSync('git ls-tree -r HEAD', [], {
		cwd: workspaceRootDirectory,
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048
	});
	assert(code === 0, `Runtime Exception: git ls-tree failed - ${stderr}`);
	const elsaPackages = getElsaPackages();

	const relevantFiles = {};
	for (const line of stdout.trim().split(/[\r\n]+/)) {
		const [, , commitId, gitFile] = line.trim().split(/\s/);
		if (gitFile) {
			const file = normalize(gitFile);
			if (!MetadataPackageFileBlockListPattern.test(file)) {
				relevantFiles[file] = commitId;
			}
		}
	}

	return writeFileToProvisioningLock(relevantFiles, elsaPackages);
}

function setContentProvisionLock(serviceFullName, contentFullName, elsaPackages, file, provisioningLock, metadataCategory, commitId) {
	const contentAssignmentId = serviceFullName || 'sap.crm.common';

	const fullName = contentFullName ?? _getFullNameFromFileLocation(elsaPackages, file);
	provisioningLock[contentAssignmentId] = provisioningLock[contentAssignmentId] ?? {};
	provisioningLock[contentAssignmentId][metadataCategory] = provisioningLock[contentAssignmentId][metadataCategory] ?? {};
	provisioningLock[contentAssignmentId][metadataCategory][fullName] = commitId;
}

function writeFileToProvisioningLock(files, elsaPackages) {
	const serviceAdaptations = {};
	const provisioningLock = {};
	for (const [file, commitId] of Object.entries(files)) {
		if (PackagePluginMetadataFileAllowPattern.test(file)) {
			const [, metadataCategory] = PackagePluginMetadataFileAllowPattern.exec(file);

			const { fullName, serviceFullName = fullName } = require(resolve(workspaceRootDirectory, file));
			if (metadataCategory === 'serviceadaptation') {
				serviceAdaptations[fullName] = commitId;
			} else {
				provisioningLock[serviceFullName] = provisioningLock[serviceFullName] ?? {};
				provisioningLock[serviceFullName][metadataCategory] = provisioningLock[serviceFullName][metadataCategory] ?? {};
				provisioningLock[serviceFullName][metadataCategory][fullName ?? _getFullNameFromFileLocation(elsaPackages, file)] = commitId;
			}
		}
		if (PackagePluginContentFileAllowPattern.test(file)) {
			const [, folderName] = PackagePluginContentFileAllowPattern.exec(file);
			const metadataCategory = folderName === 'entity' ? 'entitycontent' : folderName;
			const { fullName: contentFullName, serviceFullName, serviceFullNames } = require(resolve(workspaceRootDirectory, file));
			if (serviceFullNames && serviceFullNames.length > 0) {
				for (const serviceFullName of serviceFullNames) {
					setContentProvisionLock(serviceFullName, contentFullName, elsaPackages, file, provisioningLock, metadataCategory, commitId);
				}
			} else {
				setContentProvisionLock(serviceFullName, contentFullName, elsaPackages, file, provisioningLock, metadataCategory, commitId);
			}
		}
	}
	return addServiceAdaptationsToProvisioningLock(serviceAdaptations, provisioningLock);
}

function addServiceAdaptationsToProvisioningLock(serviceAdaptations, provisioningLock) {
	for (const [fullName, commitId] of Object.entries(serviceAdaptations)) {
		const serviceFullName = getServiceFullNameForEntity(provisioningLock, fullName);
		if (serviceFullName) {
			provisioningLock[serviceFullName]['serviceadaptation'] = provisioningLock[serviceFullName]['serviceadaptation'] ?? {};
			provisioningLock[serviceFullName]['serviceadaptation'][fullName] = commitId;
		}
	}
	return provisioningLock;
}

function getServiceFullNameForEntity(provisioningLock, entityFullName) {
	for (const [serviceFullName, data] of Object.entries(provisioningLock)) {
		if (data?.entity?.[entityFullName]) {
			return serviceFullName;
		}
	}
}

function _getFullNameFromFileLocation(elsaPackages, file) {
	const packageName = elsaPackages.find(({ relativeLocation }) => file.startsWith(relativeLocation))?.name;
	return join(packageName, basename(file));
}

function getManifestApplicationLock() {
	const applicationsDirectory = `${workspaceRootDirectory}/module/repository/repository-manifest/metadata/application`;
	const { code, stdout, stderr } = executeSync('git ls-files', [], {
		cwd: applicationsDirectory,
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048
	});
	assert(code === 0, `Runtime Exception: git ls-files failed - ${stderr}`);

	const applicationlock = {};
	for (const line of stdout.trim().split(/[\r\n]+/)) {
		const filename = normalize(line.trim());
		const { code, stdout, stderr } = executeSync('git rev-list --all -1', [filename], {
			cwd: applicationsDirectory,
			shell: true,
			stdio: 'pipe',
			maxBuffer: 2048 * 2048
		});
		assert(code === 0, `Runtime Exception: git rev-list --all -1 ${filename} failed - ${stderr}`);
		applicationlock[filename] = {
			commitId: stdout.trim()
		};
	}

	return applicationlock;
}

Object.assign(module.exports, {
	getElsaPackageContentTextDefinitions,
	getElsaPackageContentTextDefinitionsAndUsages,
	getElsaPackageContent,
	getElsaPackageMetadata,
	getElsaProvisioningLock,
	getElsaProvisioningMetadata,
	getElsaPackages,
	getManifestApplicationLock,
	extractMetadataPackageFileContent,
	createContentMaps,
	createMetadataMaps
});
