'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');
const assert = require('assert');

let startProvisionTestContentJob, buildJob, runJobInternal, console, args;

describe('startProvisionTestContentJob', function () {
	before(function () {
		this.timeout(0);
		buildJob = sinon.stub();
		runJobInternal = sinon.stub();
		console = { log: sinon.stub() };

		startProvisionTestContentJob = rewiremock.proxy(() => require('../src/startProvisionTestContentJob'), {
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

	it('shall assert if tenantId is not provided', async function () {
		await assert.rejects(async () => await startProvisionTestContentJob({}), '');
	});

	it('shall skip the build and run the job', async function () {
		runJobInternal.resolves();

		await startProvisionTestContentJob({ build: false, tenantId: 'wackeldackel' });

		sinon.assert.notCalled(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-provision-test-content', {
			ELSA_PROVISION_TEST_CONTENT_JOB_TENANT_ID: 'wackeldackel',
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'true',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'true',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			ELSA_ENABLE_WRITING_TO_BUSINESS_OBJECT_DOCUMENT_TABLE: 'true',
			ELSA_ENABLE_ENTITY_DOCUMENT_READ: 'true',
			ELSA_RUNTIME_DISABLE_BUSINESS_LOGIC: 'true',
			ELSA_RUNTIME_DISABLE_SAVE_IN_ENTITY_API: 'true'
		});
	});

	it('shall build and run the job with default envs', async function () {
		buildJob.resolves();
		runJobInternal.resolves();

		await startProvisionTestContentJob(args);

		sinon.assert.calledOnce(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-provision-test-content', {
			ELSA_PROVISION_TEST_CONTENT_JOB_TENANT_ID: 'wackeldackel',
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'true',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'true',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			ELSA_ENABLE_WRITING_TO_BUSINESS_OBJECT_DOCUMENT_TABLE: 'true',
			ELSA_ENABLE_ENTITY_DOCUMENT_READ: 'true',
			ELSA_RUNTIME_DISABLE_BUSINESS_LOGIC: 'true',
			ELSA_RUNTIME_DISABLE_SAVE_IN_ENTITY_API: 'true'
		});
	});

	it('shall build and run the job with custom envs', async function () {
		buildJob.resolves();
		runJobInternal.resolves();

		args.elsaMetadataDatabaseName = 'db';
		args.disablePublishingOfEvents = false;
		args.deployDevelopmentTextsOnly = false;
		args.transientStorage = 'storage';
		await startProvisionTestContentJob(args);
		sinon.assert.calledOnce(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-provision-test-content', {
			ELSA_PROVISION_TEST_CONTENT_JOB_TENANT_ID: 'wackeldackel',
			ELSA_METADATA_DATABASE_NAME: 'db',
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'false',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'false',
			ELSA_ENABLE_WRITING_TO_BUSINESS_OBJECT_DOCUMENT_TABLE: 'true',
			TRANSIENT_STORAGE: 'storage',
			ELSA_ENABLE_ENTITY_DOCUMENT_READ: 'true',
			ELSA_RUNTIME_DISABLE_BUSINESS_LOGIC: 'true',
			ELSA_RUNTIME_DISABLE_SAVE_IN_ENTITY_API: 'true'
		});
	});
});
