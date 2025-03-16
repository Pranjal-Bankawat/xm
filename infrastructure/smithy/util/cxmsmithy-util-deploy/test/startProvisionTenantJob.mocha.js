'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');
const assert = require('assert');

let startProvisionTenantJob, buildJob, runJobInternal, console, args;

describe('startProvisionTenantJob', function () {
	before(function () {
		this.timeout(0);
		buildJob = sinon.stub();
		runJobInternal = sinon.stub();
		console = { log: sinon.stub() };

		startProvisionTenantJob = rewiremock.proxy(() => require('../src/startProvisionTenantJob'), {
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
		await assert.rejects(async () => await startProvisionTenantJob({}), '');
	});

	it('shall skip the build and run the job', async function () {
		runJobInternal.resolves();

		await startProvisionTenantJob({ build: false, tenantId: 'wackeldackel' });

		sinon.assert.notCalled(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-provision-tenant', {
			PROVISION_TENANT_ID: 'wackeldackel',
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'true',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'true',
			ELSA_ENABLE_WRITING_TO_BUSINESS_OBJECT_DOCUMENT_TABLE: 'true',
			ELSA_RUNTIME_DISABLE_BUSINESS_LOGIC: 'true',
			ELSA_RUNTIME_DISABLE_SAVE_IN_ENTITY_API: 'true'
		});
	});

	it('shall build and run the job with default envs', async function () {
		buildJob.resolves();
		runJobInternal.resolves();

		await startProvisionTenantJob(args);

		sinon.assert.calledOnce(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-provision-tenant', {
			PROVISION_TENANT_ID: 'wackeldackel',
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'true',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'true',
			ELSA_ENABLE_WRITING_TO_BUSINESS_OBJECT_DOCUMENT_TABLE: 'true',
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
		await startProvisionTenantJob(args);
		sinon.assert.calledOnce(buildJob);
		sinon.assert.calledOnceWithExactly(runJobInternal, '@sapn/job-provision-tenant', {
			PROVISION_TENANT_ID: 'wackeldackel',
			ELSA_METADATA_DATABASE_NAME: 'db',
			ELSA_DISABLE_PUBLISHING_OF_EVENTS: 'false',
			ELSA_IMAGE_METADATA_ENABLED: 'false',
			ELSA_DEPLOY_DEV_TEXTS_ONLY: 'false',
			ELSA_ENABLE_WRITING_TO_BUSINESS_OBJECT_DOCUMENT_TABLE: 'true',
			TRANSIENT_STORAGE: 'storage',
			ELSA_RUNTIME_DISABLE_BUSINESS_LOGIC: 'true',
			ELSA_RUNTIME_DISABLE_SAVE_IN_ENTITY_API: 'true'
		});
	});
});
