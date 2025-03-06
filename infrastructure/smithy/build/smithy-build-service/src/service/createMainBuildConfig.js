'use strict';

const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');
const externals = require('../plugin/externals');
const markBundlesAsExternals = require('../plugin/markBundlesAsExternals');

module.exports = async function createMainBuildConfig(serviceManifest, workspace, baseConfig) {
	const entryPointResolveDir = resolve(__dirname, './entrypoint');
	const [startContent, deployContent] = await Promise.all([
		readFile(resolve(entryPointResolveDir, './start.js'), 'utf8'),
		readFile(resolve(entryPointResolveDir, './deploy.js'), 'utf8')
	]);

	return [
		{
			...baseConfig,
			bundle: false,
			stdin: {
				contents: startContent,
				resolveDir: entryPointResolveDir,
				sourcefile: 'start.js',
				loader: 'js'
			},
			outfile: resolve(workspace.location, './dist/start.js'),
			plugins: [externals(), markBundlesAsExternals(/Service/)]
		},
		{
			...baseConfig,
			bundle: false,
			stdin: {
				contents: deployContent,
				resolveDir: entryPointResolveDir,
				sourcefile: 'deploy.js',
				loader: 'js'
			},
			outfile: resolve(workspace.location, './dist/deploy.js'),
			plugins: [externals(), markBundlesAsExternals(/Service/)]
		}
	];
};
