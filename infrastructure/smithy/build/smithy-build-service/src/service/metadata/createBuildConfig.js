'use strict';

const { resolve } = require('node:path');
const collectMetadataFilePathsPerPackage = require('./collectMetadataFilePathsByPackage');
const compileRuntimeMetadataEntryPointContent = require('./compileRuntimeMetadataEntryPointContent');
const compileProvisioningMetadataEntryPointContent = require('./compileProvisioningMetadataEntryPointContent');

function createProvisioningMetadataBuildConfig(elsaMetadataFilePathsPerPackage, workspace, baseConfig) {
	const provisioningMetadataEntryPointContent = compileProvisioningMetadataEntryPointContent(elsaMetadataFilePathsPerPackage, workspace.location);
	return {
		stdin: {
			contents: provisioningMetadataEntryPointContent,
			resolveDir: workspace.location,
			sourcefile: 'elsa.service.json',
			loader: 'js'
		},
		...baseConfig,
		outfile: resolve(workspace.location, 'dist', 'metadata', 'elsa.provisioning.js')
	};
}

async function createRuntimeMetadataBuildConfig(elsaMetadataFilePathsPerPackage, workspace, baseConfig) {
	const runtimeMetadataEntryPointContent = await compileRuntimeMetadataEntryPointContent(elsaMetadataFilePathsPerPackage, workspace.location);
	return {
		stdin: {
			contents: runtimeMetadataEntryPointContent,
			resolveDir: workspace.location,
			sourcefile: 'elsa.service.json',
			loader: 'js'
		},
		...baseConfig,
		outfile: resolve(workspace.location, 'dist', 'metadata', 'elsa.runtime.js')
	};
}

module.exports = async function createBuildConfig({ metadata }, workspace, baseConfig, legacy) {
	const elsaMetadataFilePathsPerPackage = await collectMetadataFilePathsPerPackage(metadata);

	const buildConfigs = [createRuntimeMetadataBuildConfig(elsaMetadataFilePathsPerPackage, workspace, baseConfig)];
	if (!legacy) {
		buildConfigs.push(createProvisioningMetadataBuildConfig(elsaMetadataFilePathsPerPackage, workspace, baseConfig));
	}

	return Promise.all(buildConfigs);
};
