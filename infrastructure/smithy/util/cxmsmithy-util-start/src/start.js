'use strict';

const build = require('@sapn/elsa-build-service');
const console = require('node:console');
const { performance } = require('node:perf_hooks');
const process = require('node:process');
const requireModule = require('./requireModule');
const { relative, resolve } = require('node:path');
const setup = require('./setup');
const watch = require('@sapn/elsa-build-service/watch');

const ServerStopTimoutDefault = 20000;
const blockServiceStartUntilAllBuildsSuccessfullFinishedSemaphore = new Set();
let service;

module.exports = async function start({ esBuildConfig, disableWatcher = false }) {
	const workspace = await setup();

	const start = performance.now();
	const buildConfig = determineBuildConfig(esBuildConfig, workspace);
	if (!disableWatcher) {
		const buildWatchContexts = await watch({ config: buildConfig, workspace });
		process.once('SIGINT', () => disposeEsbuildWatchContexts(workspace, buildWatchContexts));
		process.once('SIGTERM', () => disposeEsbuildWatchContexts(workspace, buildWatchContexts));
	} else {
		await build({ config: buildConfig, workspace });
	}
	const end = performance.now();
	console.log(`Finished building bundles in ${(end - start).toFixed(3)}ms`);
};

async function disposeEsbuildWatchContexts(workspace, buildWatchContexts) {
	console.log(`Disposed esbuild contexts for service ${workspace.name}`);
	await Promise.all(buildWatchContexts.map(context => context?.dispose()));
}

function determineStartConfig(esbuildConfig, workspace) {
	const absoluteBundlePath = resolve(workspace.location, esbuildConfig.get('bundle').outfile);

	return {
		name: workspace.name,
		absoluteBundlePath
	};
}

function determineBuildConfig(esbuildConfig, workspace) {
	const startConfig = determineStartConfig(esbuildConfig, workspace);

	return [...esbuildConfig.values()].map(config => {
		return {
			...config,
			plugins: [...(config.plugins ?? []), createServiceRestartPlugin(config, workspace, startConfig)]
		};
	});
}

async function startService({ absoluteBundlePath, name }) {
	if (blockServiceStartUntilAllBuildsSuccessfullFinishedSemaphore.size === 0) {
		try {
			if (service) {
				await tryStopServerAndThrowAfterTimeout(name, service);
				removeFromRequireCache(absoluteBundlePath);
				service = null;
			}
			const start = performance.now();
			const Service = requireModule(absoluteBundlePath, console);

			console.log(`Creating Service ${name} ...`);
			service = await Service.create();

			console.log(`Starting Service ${name} ...`);
			await service.start();
			const end = performance.now();

			console.log(`Service ${name} started in ${(end - start).toFixed(3)}ms`);
		} catch (error) {
			console.error(`Error starting or creating service ${name}\n${error}: ${error.stack}`);
			throw error;
		}
	}
}

function removeFromRequireCache(absolutePath) {
	try {
		delete require.cache[require.resolve(absolutePath)];
	} catch (err) {
		console.error(`${err}: ${err.stack}`);
	}
}

async function tryStopServerAndThrowAfterTimeout(name, service) {
	console.log(`Stopping Service ${name} ...`);

	const stopPromise = service.stop();
	const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(new Error('server stop timed out')), ServerStopTimoutDefault));
	const result = await Promise.race([stopPromise, timeoutPromise]);

	if (result instanceof Error) {
		throw result;
	}
}

function createServiceRestartPlugin(config, workspace, startConfig) {
	return {
		name: 'service-restart',
		setup(build) {
			const console = require('node:console');
			const bundleExportName = `${workspace.name}/${relative(workspace.location, config.outfile)}`;

			build.onStart(() => {
				blockServiceStartUntilAllBuildsSuccessfullFinishedSemaphore.add(bundleExportName);
			});

			build.onEnd(async result => {
				if (result.errors?.length > 0) {
					console.error(`Rebuilt bundle ${bundleExportName} failed with ${result.errors?.length} errors: ${JSON.stringify(result.errors)}`);
				} else {
					blockServiceStartUntilAllBuildsSuccessfullFinishedSemaphore.delete(bundleExportName);
					console.log(`Rebuilt bundle ${bundleExportName}`);
					await startService(startConfig);
				}
			});
		}
	};
}
