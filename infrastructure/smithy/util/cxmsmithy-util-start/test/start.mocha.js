'use strict';

const assert = require('node:assert/strict');
const rewiremock = require('rewiremock').default;
const { resolve } = require('node:path');
const sinon = require('sinon');

describe('start', function () {
	let start, esbuild, esBuildConfig, buildConfig, pluginContext;
	let bundle;
	let service;
	let console;
	let build;
	let setupStart;
	let process, workspace;
	let requireModule;
	let watch;
	let dispose;

	before(function () {
		this.timeout(0);

		workspace = { name: '@sapn/workspace', location: '/path/to/workspace/folder' };

		process = {
			once: sinon.stub()
		};

		pluginContext = {
			onStart: sinon.stub(),
			onEnd: sinon.stub()
		};
		dispose = sinon.stub();
		watch = sinon.fake(async ({ config }) =>
			config.map(({ plugins }) => {
				plugins.find(plugin => plugin.name === 'service-restart').setup(pluginContext);
				return { dispose };
			})
		);

		build = sinon.fake(async ({ config }) =>
			config.forEach(({ plugins }) => {
				plugins.find(plugin => plugin.name === 'service-restart').setup(pluginContext);
			})
		);
		console = {
			log: sinon.stub(),
			error: sinon.stub()
		};

		setupStart = sinon.stub();

		requireModule = sinon.stub();

		start = rewiremock.proxy(
			() => require('../src/start'),
			r => ({
				esbuild,
				'@sapn/elsa-build-service': build,
				'@sapn/elsa-build-service/watch': watch,
				'node:console': console,
				'node:process': r.callThrough().with(process),
				[require.resolve('../src/setup')]: setupStart,
				[require.resolve('../src/requireModule')]: requireModule
			})
		);
	});

	beforeEach(function () {
		setupStart.reset();
		setupStart.resolves(workspace);
		service = {
			start: sinon.stub().resolves(),
			stop: sinon.stub().resolves()
		};
		bundle = { create: sinon.stub().resolves(service) };

		esBuildConfig = new Map([['bundle', { outfile: resolve(workspace.location, 'dist/bundle.js') }]]);

		buildConfig = [...esBuildConfig.values()].map(config => ({
			...config,
			plugins: [{ name: 'service-restart', setup: sinon.match.func }]
		}));

		requireModule.reset();
		requireModule.withArgs(esBuildConfig.get('bundle', console).outfile).returns(bundle);

		process.once.reset();

		console.log.reset();
		console.error.reset();
		watch.resetHistory();
		build.resetHistory();

		pluginContext.onStart.reset();
		pluginContext.onEnd.reset();
		dispose.reset();

		rewiremock(() => require('node:console')).with(console);
		rewiremock.enable();
	});

	afterEach(function () {
		rewiremock.disable();
	});

	it('shall initialize watching the service', async function () {
		await start({ esBuildConfig });

		sinon.assert.calledOnce(setupStart);
		sinon.assert.calledOnce(watch);
		sinon.assert.calledWith(watch, { config: buildConfig, workspace });
		sinon.assert.notCalled(build);
		sinon.assert.calledTwice(process.once);
		sinon.assert.calledWith(process.once, 'SIGINT', sinon.match.func);
		sinon.assert.calledWith(process.once, 'SIGTERM', sinon.match.func);
		sinon.assert.calledOnce(console.log);
		sinon.assert.calledWith(console.log, sinon.match(/^Finished building bundles in [0-9.]+ms$/));
	});

	it('shall build the service', async function () {
		await start({ esBuildConfig, disableWatcher: true });

		sinon.assert.calledOnce(setupStart);
		sinon.assert.notCalled(watch);
		sinon.assert.calledOnce(build);
		sinon.assert.calledWith(build, { config: buildConfig, workspace });
		sinon.assert.notCalled(process.once);
		sinon.assert.calledOnce(console.log);
		sinon.assert.calledWith(console.log, sinon.match(/^Finished building bundles in [0-9.]+ms$/));
	});

	it('shall setup the server restart plugin for each esbuild config', async function () {
		await start({ esBuildConfig });

		sinon.assert.calledOnce(pluginContext.onStart);
		sinon.assert.calledWith(pluginContext.onStart, sinon.match.func);
		sinon.assert.calledOnce(pluginContext.onEnd);
		sinon.assert.calledWith(pluginContext.onEnd, sinon.match.func);
	});

	it('shall start the service once all initial builds are finished', async function () {
		await pluginContext.onStart.yields();

		await start({ esBuildConfig });
		sinon.assert.notCalled(bundle.create); // create can only be called once all builds are finished
		await Promise.all(pluginContext.onEnd.yield({}));

		sinon.assert.calledOnce(bundle.create);
		sinon.assert.notCalled(service.stop);
		sinon.assert.calledOnce(service.start);
		sinon.assert.callCount(console.log, 5);
		sinon.assert.calledWith(console.log.getCall(1), sinon.match(/^Rebuilt bundle @sapn\/workspace\/dist\/bundle\.js$/));
		sinon.assert.calledWith(console.log.getCall(2), sinon.match(/^Creating Service @sapn\/workspace \.\.\.$/));
		sinon.assert.calledWith(console.log.getCall(3), sinon.match(/^Starting Service @sapn\/workspace \.\.\.$/));
		sinon.assert.calledWith(console.log.getCall(4), sinon.match(/^Service @sapn\/workspace started in [0-9.]+ms$/));
	});

	it('shall restart the service once all rebuilds are finished', async function () {
		await start({ esBuildConfig });
		//build
		await Promise.all(pluginContext.onStart.yield());
		await Promise.all(pluginContext.onEnd.yield({}));
		sinon.assert.calledOnce(bundle.create);
		//rebuild
		await Promise.all(pluginContext.onStart.yield());
		await Promise.all(pluginContext.onEnd.yield({}));
		sinon.assert.calledTwice(bundle.create);

		sinon.assert.calledOnce(service.stop);
		sinon.assert.calledTwice(service.start);
	});

	it('shall block (re-)start if any build results has errors', async function () {
		await start({ esBuildConfig });
		//build
		await Promise.all(pluginContext.onStart.yield());
		await Promise.all(pluginContext.onEnd.yield({ errors: ['SomeBuildError'] }));
		sinon.assert.notCalled(bundle.create);
		sinon.assert.notCalled(service.stop);
		sinon.assert.notCalled(service.start);
		sinon.assert.calledWith(console.error, sinon.match(/^Rebuilt bundle @sapn\/workspace\/dist\/bundle\.js failed with 1 errors: \["SomeBuildError"\]$/));
	});

	it('shall (re-)start service if error is solved', async function () {
		await start({ esBuildConfig });
		//build
		await Promise.all(pluginContext.onStart.yield());
		await Promise.all(pluginContext.onEnd.yield({ errors: ['SomeBuildError'] }));
		//rebuild
		await Promise.all(pluginContext.onStart.yield());
		await Promise.all(pluginContext.onEnd.yield({}));

		sinon.assert.calledOnce(bundle.create);
		sinon.assert.calledOnce(service.start);
	});

	it('shall throw exception if service start raises exception', async function () {
		service.start.rejects('SomeServiceStartError');
		await start({ esBuildConfig });
		await Promise.all(pluginContext.onStart.yield());
		await assert.rejects(Promise.all(pluginContext.onEnd.yield({})));
		sinon.assert.calledWith(console.error, sinon.match(/^Error starting or creating service @sapn\/workspace\nSomeServiceStartError:/));
	});

	it('shall throw exception if service stop raises exception', async function () {
		service.stop.resolves(new Error('SomeServiceStopError'));
		await start({ esBuildConfig });
		await Promise.all(pluginContext.onStart.yield());
		await Promise.all(pluginContext.onEnd.yield({}));
		await Promise.all(pluginContext.onStart.yield());
		await assert.rejects(Promise.all(pluginContext.onEnd.yield({})), /SomeServiceStopError/);
	});

	it('shall dispose the watch contexts of SIGINT is emitted', async function () {
		await start({ esBuildConfig });
		await process.once.firstCall.yield();
		sinon.assert.calledWith(console.log, sinon.match(/^Disposed esbuild contexts for service @sapn\/workspace$/));
		sinon.assert.calledOnce(dispose);
	});

	it('shall dispose the watch contexts of SIGTERM is emitted', async function () {
		await start({ esBuildConfig });
		await process.once.secondCall.yield();
		sinon.assert.calledWith(console.log, sinon.match(/^Disposed esbuild contexts for service @sapn\/workspace$/));
		sinon.assert.calledOnce(dispose);
	});
});
