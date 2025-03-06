'use strict';

const assert = require('node:assert');
const console = require('node:console');
const { readFile } = require('node:fs/promises');
const { basename, resolve } = require('node:path');
const generateModelDescriptor = require('@sapn/elsa-runtime/generateModelDescriptor');
const DbEntityNameDetermination = require('@sapn/elsa-database/DbEntityNameDetermination');

const dbEntityNameDetermination = new DbEntityNameDetermination();

async function mapBusinessObjectFileNameToMetadata(packageMetadataBusinessObjectDirectoryPath, boMetdataFileName) {
	const filePath = resolve(packageMetadataBusinessObjectDirectoryPath, boMetdataFileName);
	const content = await readFile(filePath, 'utf8');
	return [boMetdataFileName, JSON.parse(content)];
}

function getChildNodes(childNodeFileNames = [], boFileNameMetadataMap) {
	const childNodes = [];
	for (const childNodeFileName of childNodeFileNames) {
		const childNodeBaseFileName = basename(childNodeFileName);
		const childNodeMetadata = boFileNameMetadataMap.get(childNodeBaseFileName);
		assert(childNodeMetadata, `Child node metadata not found for ${childNodeBaseFileName}`);
		childNodes.push({ content: childNodeMetadata, path: childNodeFileName }, ...getChildNodes(childNodeMetadata.nodes, boFileNameMetadataMap));
	}
	return childNodes;
}

function createDependencies(dataTypes) {
	return {
		async loadDataTypes(requestScope, dataTypeIds) {
			assert(Array.isArray(dataTypeIds), 'dataTypeIds must be array');
			for (const dataTypeId of dataTypeIds) {
				assert(dataTypeId in dataTypes, `Data type ${dataTypeId} not found`);
			}
			return dataTypes;
		},
		dbEntityNameDetermination,
		log: {
			setFileName() {
				return console;
			}
		}
	};
}

module.exports = async function generateBusinessObjectModelDescriptor(packageMetadataBusinessObjectDirectoryPath, boMetdataFiles, dataTypes) {
	const boFileNameMetadataMapPromises = [];
	for (const boMetadataFileName of boMetdataFiles) {
		boFileNameMetadataMapPromises.push(mapBusinessObjectFileNameToMetadata(packageMetadataBusinessObjectDirectoryPath, boMetadataFileName));
	}

	const boFileNameMetadataMap = new Map(await Promise.all(boFileNameMetadataMapPromises));

	const boModelDescriptorGenerationPromises = [];
	const dependencies = createDependencies(dataTypes);

	for (const [fileName, metadata] of boFileNameMetadataMap) {
		if (metadata.isRoot) {
			const businessObjectNodes = [{ content: metadata, path: `./${fileName}` }, ...getChildNodes(metadata.nodes, boFileNameMetadataMap)];
			boModelDescriptorGenerationPromises.push(generateModelDescriptor(businessObjectNodes, dependencies));
		}
	}
	return Promise.all(boModelDescriptorGenerationPromises);
};
