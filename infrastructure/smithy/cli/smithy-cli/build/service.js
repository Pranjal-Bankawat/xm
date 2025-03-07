'use strict';

const process = require('node:process');

module.exports = {
	command: 'service [workspaceName]',
	describe: 'build service',
	builder: yargs =>
		yargs
			.usage('service [workspaceName]')
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
				minify: {
					describe: 'minify the source code',
					type: 'boolean'
				}
			}),
	handler: async function bundle({ analyze, minify, verbose, workspaceName }) {
		const { smithyBuild, smithyGetWorkspaces } = require('./temp/temp');
		if (verbose) {
			process.env.npm_config_loglevel = 'verbose';
		}

		const build = smithyBuild;
		const getWorkspaces = smithyGetWorkspaces;

		const workspace = getWorkspaces([workspaceName], { dependencies: false, metadata: false })[workspaceName];

		await build({ verbose, workspace, analyze, minify });
	}
};
