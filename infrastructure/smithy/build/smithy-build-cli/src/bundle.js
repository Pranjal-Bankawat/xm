'use strict';

const process = require('node:process');

module.exports = {
	command: 'bundle [workspaceName]',
	describe: 'build workspace bundles',
	builder: yargs =>
		yargs
			.usage('bundle [workspaceName]')
			.positional('workspaceName', {
				describe: 'workspace package name',
				type: 'string',
				default: process.env.npm_package_name
			})
			.options({
				analyze: {
					describe: 'analyze build result',
					type: 'boolean',
					default: false
				},
				config: {
					describe: 'path to config file',
					default: 'esbuild.config.js',
					nargs: 1,
					normalize: true
				},
				minify: {
					describe: 'minify the source code',
					type: 'boolean'
				},
				legacy: {
					describe: 'enable service build for legacy services',
					type: 'boolean',
					default: false
				}
			}),
	handler: async function bundle({ config: buildBundleConfig, analyze, minify, legacy, verbose, workspaceName }) {
		if (verbose) {
			process.env.npm_config_loglevel = 'verbose';
		}

		const { resolve } = require('path');
		const build = require('@sapn/elsa-build-service');
		const getWorkspaces = require('@sapn/elsa-util-workspace/get');

		const workspace = getWorkspaces([workspaceName], { dependencies: false, metadata: false })[workspaceName];
		const configMap = require(resolve(workspace.location, buildBundleConfig));
		const config = [...configMap.values()].map(config => ({
			...config,
			metafile: analyze,
			keepNames: true,
			minify: minify ?? config.minify
		}));

		await build({ config, verbose, workspace });
		if (legacy) {
			const buildService = require('@sapn/elsa-build-service/service');
			await buildService({ verbose, workspace, legacy });
		}
	}
};
