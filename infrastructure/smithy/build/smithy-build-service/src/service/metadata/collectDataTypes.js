'use strict';

const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

module.exports = async function collectDataTypes(packageMetadataDataTypeDirectoryPath, dataTypeMetdataFiles) {
	const fileContentPromises = [];
	for (const dataTypeFileName of dataTypeMetdataFiles) {
		const filePath = resolve(packageMetadataDataTypeDirectoryPath, dataTypeFileName);
		fileContentPromises.push(await readFile(filePath, 'utf8'));
	}
	const fileContents = await Promise.all(fileContentPromises);
	const dataTypes = [];
	for (const content of fileContents) {
		const metadata = JSON.parse(content);
		metadata.fullName = [metadata.namespace, metadata.name].join('/');
		dataTypes.push(metadata);
	}
	return dataTypes;
};
