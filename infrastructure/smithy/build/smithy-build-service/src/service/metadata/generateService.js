'use strict';

const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

module.exports = async function generateService(packageMetadataServiceDirectoryPath, serviceMetadataFiles, packageName) {
	const fileContentPromises = [];
	for (const serviceFileName of serviceMetadataFiles) {
		const filePath = resolve(packageMetadataServiceDirectoryPath, serviceFileName);
		fileContentPromises.push(await readFile(filePath, 'utf8'));
	}
	const fileContents = await Promise.all(fileContentPromises);
	const services = [];
	for (const content of fileContents) {
		const metadata = JSON.parse(content);
		metadata.namespace = packageName;
		services.push(metadata);
	}
	return services;
};
