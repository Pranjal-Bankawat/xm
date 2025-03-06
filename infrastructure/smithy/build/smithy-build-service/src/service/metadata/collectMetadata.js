'use strict';

const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

module.exports = async function collectMetadata(packageMetadataDirectoryPath, metdataFiles) {
	const fileContentPromises = [];
	for (const metadataFileName of metdataFiles) {
		const filePath = resolve(packageMetadataDirectoryPath, metadataFileName);
		fileContentPromises.push(await readFile(filePath, 'utf8'));
	}
	const fileContents = await Promise.all(fileContentPromises);
	const metadata = [];
	for (const content of fileContents) {
		metadata.push(JSON.parse(content));
	}
	return metadata;
};
