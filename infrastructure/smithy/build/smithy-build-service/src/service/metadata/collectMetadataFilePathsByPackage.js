'use strict';

const { resolve, dirname } = require('node:path');
const { access, readdir } = require('node:fs/promises');
const { execSync } = require('node:child_process');
const { METADATA_DIRECTORY_NAME, CONTENT_DIRECTORY_NAME } = require('./Constant');

async function exists(path) {
	return access(path)
		.then(() => true)
		.catch(() => false);
}

function getPackageMetadataCurrentCommitHash(metadataPackagePath) {
	return execSync(`git --no-pager log -n1 --pretty=format:%h ${metadataPackagePath}`).toString().trim();
}

async function collectPackageMetadataFilePaths(metadataPackageName, metadataPackagePath, metadataDirectoryName) {
	const packageMetadataFilePaths = {
		packageName: metadataPackageName,
		packagePath: metadataPackagePath
	};
	if (await exists(resolve(packageMetadataFilePaths.packagePath, metadataDirectoryName))) {
		packageMetadataFilePaths[metadataDirectoryName] = {};
		const packageMetadataPath = resolve(packageMetadataFilePaths.packagePath, metadataDirectoryName);
		const packageMetadataTypeDirectories = await readdir(packageMetadataPath);
		for (const packageMetadataTypeDirectory of packageMetadataTypeDirectories) {
			packageMetadataFilePaths[metadataDirectoryName][packageMetadataTypeDirectory] = [];
			const packageMetadataTypePath = resolve(packageMetadataPath, packageMetadataTypeDirectory);
			packageMetadataFilePaths[metadataDirectoryName][packageMetadataTypeDirectory] = await readdir(packageMetadataTypePath);
		}
	}
	return packageMetadataFilePaths;
}

module.exports = async function collectMetadataFilePathsPerPackage(metadataPackageNames) {
	const metadataFilePathsPerPackage = {};
	const collectPackageMetadataFilePathsPromises = [];

	for (const metadataPackageName of metadataPackageNames) {
		const metadataPackagePath = dirname(require.resolve(metadataPackageName));
		metadataFilePathsPerPackage[metadataPackageName] = {
			packagePath: metadataPackagePath,
			packageVersion: getPackageMetadataCurrentCommitHash(metadataPackagePath)
		};
		collectPackageMetadataFilePathsPromises.push(collectPackageMetadataFilePaths(metadataPackageName, metadataPackagePath, METADATA_DIRECTORY_NAME));
		collectPackageMetadataFilePathsPromises.push(collectPackageMetadataFilePaths(metadataPackageName, metadataPackagePath, CONTENT_DIRECTORY_NAME));
	}
	const packageMetadataFilePaths = await Promise.all(collectPackageMetadataFilePathsPromises);
	for (const packageMetadataFilePath of packageMetadataFilePaths) {
		if (METADATA_DIRECTORY_NAME in packageMetadataFilePath) {
			metadataFilePathsPerPackage[packageMetadataFilePath.packageName][METADATA_DIRECTORY_NAME] = packageMetadataFilePath[METADATA_DIRECTORY_NAME];
		}
		if (CONTENT_DIRECTORY_NAME in packageMetadataFilePath) {
			metadataFilePathsPerPackage[packageMetadataFilePath.packageName][CONTENT_DIRECTORY_NAME] = packageMetadataFilePath[CONTENT_DIRECTORY_NAME];
		}
	}
	return metadataFilePathsPerPackage;
};
