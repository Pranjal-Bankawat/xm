'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let startProvisionClusterJob, buildJob, runJobInternal, console, args;
const JOB_NAME = '@sapn/job-provision-cluster';

describe('startProvisionClusterJob', function () {
	before(function () {
		this.timeout(0);
		buildJob = sinon.stub();
		runJobInternal = sinon.stub();
		console = { log: sinon.stub() };

		startProvisionClusterJob = rewiremock.proxy(() => require('../src/startProvisionClusterJob'), {
			[require.resolve('../src/buildJob')]: buildJob,
			[require.resolve('../src/runJobInternal')]: runJobInternal,
			'node:console': console
		});
	});

	beforeEach(function () {
		buildJob.resetHistory();
		runJobInternal.resetHistory();
		args = { tenantId: 'wackeldackel' };
	});

	it('shall skip the build and run the job', async function () {
		runJobInternal.resolves();

		await startProvisionClusterJob({ build: false, tenantId: 'wackeldackel' });

		sinon.assert.notCalled(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, JOB_NAME, {
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'true',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			PUBLISH_ALL_METADATA: 'true',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'true'
		});
	});

	it('shall build and run the job with default envs', async function () {
		buildJob.resolves();
		runJobInternal.resolves();

		await startProvisionClusterJob(args);

		sinon.assert.calledOnce(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, JOB_NAME, {
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'true',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			PUBLISH_ALL_METADATA: 'true',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'true'
		});
	});

	it('shall build and run the job with custom envs', async function () {
		buildJob.resolves();
		runJobInternal.resolves();

		args.elsaMetadataDatabaseName = 'db';
		args.disablePublishingOfEvents = false;
		args.deployDevelopmentTextsOnly = false;
		args.transientStorage = 'storage';
		await startProvisionClusterJob(args);
		sinon.assert.calledOnce(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, JOB_NAME, {
			ELSA_METADATA_DATABASE_NAME: 'db',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'false',
			PUBLISH_ALL_METADATA: 'true',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'false'
		});
	});
});
