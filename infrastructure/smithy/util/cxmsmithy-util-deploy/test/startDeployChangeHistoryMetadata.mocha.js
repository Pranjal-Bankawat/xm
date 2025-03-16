'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let startDeployChangeHistoryMetadata, buildJob, runJobInternal, console, args;

describe('startDeployChangeHistoryMetadata', function () {
	before(function () {
		this.timeout(0);
		buildJob = sinon.stub();
		runJobInternal = sinon.stub();
		console = { log: sinon.stub() };

		startDeployChangeHistoryMetadata = rewiremock.proxy(() => require('../src/startDeployChangeHistoryMetadata'), {
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

		await startDeployChangeHistoryMetadata({ build: false });

		sinon.assert.notCalled(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-change-history-deploy-metadata-local', {
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'true',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			PUBLISH_ALL_METADATA: 'true',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'true'
		});
	});

	it('shall build and run the job with default envs', async function () {
		buildJob.resolves();
		runJobInternal.resolves();

		await startDeployChangeHistoryMetadata(args);

		sinon.assert.calledOnce(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-change-history-deploy-metadata-local', {
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'true',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			PUBLISH_ALL_METADATA: 'true',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'true'
		});
	});

	it('shall build and run the job with custom envs', async function () {
		buildJob.resolves();
		runJobInternal.resolves();

		args.disablePublishingOfEvents = false;
		args.deployDevelopmentTextsOnly = false;
		await startDeployChangeHistoryMetadata(args);
		sinon.assert.calledOnce(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-change-history-deploy-metadata-local', {
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'false',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			PUBLISH_ALL_METADATA: 'true',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'false'
		});
	});
});
