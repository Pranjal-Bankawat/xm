'use strict';

const { relative, resolve, basename, extname } = require('node:path');
const console = require('node:console');
const esbuild = require('esbuild');
const { mkdir, stat, writeFile } = require('node:fs/promises');
const { performance } = require('node:perf_hooks');

async function createReportDirectory(workspace) {
	await mkdir(resolve(workspace.location, './report/esbuild'), { recursive: true });
}

async function writeBuildReport(workspace, bundleName, result, verbose) {
	await writeFile(resolve(workspace.location, './report/esbuild/', `${bundleName}.json`), JSON.stringify(result.metafile));

	console.log(
		(await esbuild.analyzeMetafile(result.metafile, {
			verbose
		})) + '\n'
	);
}

async function _build(config, workspace) {
	const start = performance.now();
	const result = await esbuild.build(config);
	const end = performance.now();
	const duration = (end - start).toFixed(3);
	const bundleFileStats = await stat(config.outfile);
	const bundleExportName = `${workspace.name}/${relative(workspace.location, config.outfile)}`;
	console.log(`Created bundle ${bundleExportName} in ${duration}ms with size ${Math.round(Math.ceil(bundleFileStats.size / 1024))}kb`);
	return result;
}

module.exports = async function build({ config, workspace, verbose }) {
	if (config.some(({ metafile }) => metafile)) {
		await createReportDirectory(workspace);
	}

	return Promise.all(
		config.map(async config => {
			const bundleFileName = basename(config.outfile, extname(config.outfile));
			const result = await _build(config, workspace);
			if (config.metafile && result.metafile) {
				await writeBuildReport(workspace, bundleFileName, result, verbose);
			}
			return result;
		})
	);
};
