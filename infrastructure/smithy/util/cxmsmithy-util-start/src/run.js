'use strict';

const build = require('@sapn/elsa-build-service');
const console = require('node:console');
const { performance } = require('node:perf_hooks');
const requireModule = require('./requireModule');
const { resolve } = require('node:path');
const setup = require('./setup');

module.exports = async function run({ esBuildConfig }) {
	const workspace = await setup();

	const start = performance.now();
	await build({ config: [...esBuildConfig.values()], workspace });
	const buildEnd = performance.now();
	console.log(`Finished building bundles in ${(buildEnd - start).toFixed(3)}ms`);

	const absoluteBundlePath = resolve(process.cwd(), esBuildConfig.get('bundle').outfile);
	const Job = requireModule(absoluteBundlePath, console);

	console.log('Creating Job ...');
	const job = await Job.create();

	console.log('Running Job ...');
	await job.run();
	const end = performance.now();
	console.log(`Job finished in ${(end - start).toFixed(3)}ms`);
};
