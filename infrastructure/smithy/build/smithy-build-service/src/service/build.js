'use strict';

const { resolve } = require('node:path');
const { readFile } = require('node:fs/promises');
const { env } = require('node:process');
const createMainBuildConfig = require('./createMainBuildConfig');
const createMetadataBuildConfig = require('./metadata/createBuildConfig');
const createServiceBuildConfig = require('./createServiceBuildConfig');
const determineBaseConfig = require('../util/determineNodeBaseConfig');
const deepMerge = require('../util/deepMerge');
const buildAll = require('../build');

/**
 * Build the service bundles for the provided workspace.
 * @param {object} options
 * @param {boolean} options.analyze - enable build analysis
 * @param {boolean} options.minify - enable minification
 * @param {boolean} options.verbose - enable verbose output in logging and analysis
 * @param {boolean} [options.legacy=false] - enable legacy build used to integrate service build results into legacy services
 * @param {import('@sapn/elsa-util-workspace').Workspace} options.workspace - workspace for which the service is built
 * @returns {Promise<void>}
 */
module.exports = async function build({ analyze, legacy = false, minify, verbose, workspace }) {
	const serviceManifestFilePath = resolve(workspace.location, './elsa.service.json');
	const serviceManifestFileContent = await readFile(serviceManifestFilePath, 'utf8');
	let serviceManifest = JSON.parse(serviceManifestFileContent);

	if (env.NODE_ENV === 'development' && env.NODE_ENV in serviceManifest) {
		serviceManifest = deepMerge(serviceManifest, serviceManifest[env.NODE_ENV]);
	}

	const baseConfig = determineBaseConfig();

	const buildConfig = {
		...baseConfig,
		metafile: !!analyze,
		keepNames: true,
		minify: minify ?? baseConfig.minify
	};

	const promises = [createMetadataBuildConfig(serviceManifest, workspace, buildConfig, legacy)];
	if (!legacy) {
		promises.push(createServiceBuildConfig(serviceManifest, workspace, buildConfig));
		promises.push(createMainBuildConfig(serviceManifest, workspace, buildConfig));
	}
	const config = (await Promise.all(promises)).flat();

	return buildAll({ config, workspace, verbose });
};
