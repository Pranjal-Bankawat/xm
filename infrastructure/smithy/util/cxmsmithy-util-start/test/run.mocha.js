'use strict';

const rewiremock = require('rewiremock').default;
const sinon = require('sinon');
const { resolve } = require('path');

describe('run', function () {
	let run, esbuild, esBuildConfig, moduleInvalidator;
	let bundle;
	let job;
	let build;
	let console;
	let setupStarter;
	let requireModule;
	let workspace;

	before(function () {
		this.timeout(0);

		esbuild = {
			build: sinon.stub()
		};

		job = {
			run: sinon.stub()
		};

		bundle = {
			create: sinon.stub()
		};

		bundle.create.withArgs().resolves(job);

		build = sinon.stub().resolves();
		console = {
			log: sinon.stub(),
			error: sinon.stub()
		};
		workspace = {};
		setupStarter = sinon.stub().resolves(workspace);

		requireModule = sinon.stub();
		requireModule.withArgs(resolve(__dirname, '../dist/bundle.js'), console).returns(bundle);

		run = rewiremock.proxy(() => require('../src/run'), {
			esbuild,
			'@sapn/elsa-build-service': build,
			'node:console': console,
			[resolve(__dirname, '../src/setup')]: setupStarter,
			[resolve(__dirname, '../src/requireModule')]: requireModule,
			[resolve(__dirname, '../dist/bundle')]: bundle
		});

		rewiremock(resolve(__dirname, '../package.json')).with({ name: 'hubeldubel' });
		rewiremock.enable();
	});

	beforeEach(function () {
		esBuildConfig = new Map([
			[
				'bundle',
				{
					outfile: './dist/bundle.js'
				}
			]
		]);

		job.run.reset();

		build.resetHistory();
		setupStarter.resetHistory();
		esbuild.build.resetHistory();

		moduleInvalidator = sinon.stub();
	});

	after(function () {
		rewiremock.disable();
	});

	it('shall run the job and default the other arguments', async function () {
		await run({ esBuildConfig });

		sinon.assert.calledOnce(job.run);
	});

	it('shall run the job and call setupStarter', async function () {
		await run({ esBuildConfig, moduleInvalidator, serverStopTimout: 0 });

		sinon.assert.calledOnce(setupStarter);
	});

	it('shall call build', async function () {
		await run({ esBuildConfig, moduleInvalidator, serverStopTimout: 0 });

		sinon.assert.calledOnce(build);
		sinon.assert.calledWith(build, { config: [...esBuildConfig.values()], workspace });

		sinon.assert.callOrder(build, job.run);
	});
});
