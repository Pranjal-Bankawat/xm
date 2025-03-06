'use strict';

const { resolve } = require('node:path');
const { readFile } = require('node:fs/promises');
const externals = require('../plugin/externals');
const requireContext = require('../plugin/requireContext');
const determineBundleGlobals = require('../util/determineBundleGlobals');
const bundleWorkers = require('../plugin/bundleWorkers');
const copyElsaPatches = require('../plugin/elsaPatches');
const copyElsaBinaries = require('../plugin/elsaBinaries');
const replaceNodeGlobals = require('../plugin/replaceNodeGlobals');
const elsaServiceScopePlugin = require('./plugin/scope');
const elsaServiceManifestPlugin = require('./plugin/manifest');

const BANNER = (BUILDTIMESTAMP, COMMITHASH, VERSION) => `/**
* BUILDTIMESTAMP: ${BUILDTIMESTAMP}
* COMMITHASH: ${COMMITHASH}
* VERSION: ${VERSION}
**/`;

module.exports = async function createServiceBuildConfig(serviceManifest, workspace, baseConfig) {
	const entryPointResolveDir = resolve(__dirname, './entrypoint');
	const serviceFileContent = await readFile(resolve(entryPointResolveDir, './Service.js'), 'utf8');
	const { VERSION, PACKAGENAME, BUILDTIMESTAMP, COMMITHASH } = determineBundleGlobals(workspace.location);
	return [
		{
			...baseConfig,
			stdin: {
				contents: serviceFileContent,
				resolveDir: workspace.location,
				sourcefile: 'service.entrypoint.js',
				loader: 'js'
			},
			banner: {
				js: BANNER(BUILDTIMESTAMP, COMMITHASH, VERSION)
			},
			loader: {
				'.sql': 'text'
			},
			outfile: resolve(workspace.location, 'dist', 'Service.js'),
			plugins: [
				elsaServiceScopePlugin(serviceManifest, workspace),
				elsaServiceManifestPlugin(serviceManifest, workspace),
				copyElsaPatches(workspace),
				copyElsaBinaries(),
				externals(['./metadata/elsa.provisioning.js', './metadata/elsa.runtime.js']),
				requireContext({ ignoreContent: true, ignoreMetadata: true }),
				bundleWorkers(workspace, baseConfig),
				replaceNodeGlobals({
					VERSION,
					PACKAGENAME,
					BUILDTIMESTAMP,
					COMMITHASH
				})
			]
		}
	];
};
