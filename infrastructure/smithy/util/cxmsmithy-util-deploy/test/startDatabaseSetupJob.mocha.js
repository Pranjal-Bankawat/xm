'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let startDatabaseSetupJob, buildJob, runJobInternal, console, args;

describe('startDatabaseSetupJob', function () {
	before(function () {
		this.timeout(0);
		buildJob = sinon.stub();
		runJobInternal = sinon.stub();
		console = { log: sinon.stub() };

		startDatabaseSetupJob = rewiremock.proxy(() => require('../src/startDatabaseSetupJob'), {
			[require.resolve('../src/buildJob')]: buildJob,
			[require.resolve('../src/runJobInternal')]: runJobInternal,
			'node:console': console
		});
	});

	beforeEach(function () {
		buildJob.resetHistory();
		runJobInternal.resetHistory();
		args = {};
	});

	it('shall skip the build and run the job', async function () {
		runJobInternal.resolves();

		await startDatabaseSetupJob({ build: false });

		sinon.assert.notCalled(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-database-setup', {});
	});

	it('shall build and run the job with default envs', async function () {
		buildJob.resolves();
		runJobInternal.resolves();

		await startDatabaseSetupJob(args);

		sinon.assert.calledOnce(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-database-setup', {});
	});

	it('shall build and run the job with custom envs', async function () {
		buildJob.resolves();
		runJobInternal.resolves();

		args.elsaMetadataDatabaseName = 'db';
		await startDatabaseSetupJob(args);
		sinon.assert.calledOnce(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-database-setup', {
			ELSA_METADATA_DATABASE_NAME: 'db'
		});
	});
});
