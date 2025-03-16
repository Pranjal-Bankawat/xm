'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let testTenantId, provisionBaselineTestTenant, process, startDatabaseSetupJob, startProvisionClusterJob, startProvisionTenantJob, startProvisionTestContentJob;

describe('provisionTestTenant', function () {
	before(function () {
		this.timeout(0);
		testTenantId = 'theTestTenant';
		process = { env: {} };
		startDatabaseSetupJob = sinon.stub();
		startProvisionClusterJob = sinon.stub();
		startProvisionTenantJob = sinon.stub();
		startProvisionTestContentJob = sinon.stub();
		provisionBaselineTestTenant = rewiremock.proxy(() => require('../src/provisionBaselineTestTenant'), {
			[require.resolve('../src/startDatabaseSetupJob.js')]: startDatabaseSetupJob,
			[require.resolve('../src/startProvisionClusterJob.js')]: startProvisionClusterJob,
			[require.resolve('../src/startProvisionTenantJob.js')]: startProvisionTenantJob,
			[require.resolve('../src/startProvisionTestContentJob.js')]: startProvisionTestContentJob,
			'node:process': process
		});
	});

	beforeEach(function () {
		startDatabaseSetupJob.resetHistory();
		startProvisionClusterJob.resetHistory();
		startProvisionTenantJob.resetHistory();
		startProvisionTestContentJob.resetHistory();
		delete process.env.MOCHA_SETUP;
		delete process.env.ELSA_DEPLOY_ALL_TEXTS;
	});

	it('shall run the provisioning baseline test tenant jobs using the default args', async function () {
		await provisionBaselineTestTenant(testTenantId);
		sinon.assert.calledOnceWithExactly(startDatabaseSetupJob, { build: false, elsaMetadataDatabaseName: testTenantId });
		sinon.assert.calledOnceWithExactly(startProvisionClusterJob, {
			build: false,
			tenantId: testTenantId,
			elsaMetadataDatabaseName: testTenantId,
			deployDevelopmentTextsOnly: true
		});
		sinon.assert.calledOnceWithExactly(startProvisionTenantJob, {
			build: false,
			tenantId: testTenantId,
			elsaMetadataDatabaseName: testTenantId,
			deployDevelopmentTextsOnly: true,
			transientStorage: 'redis'
		});
		sinon.assert.calledOnceWithExactly(startProvisionTestContentJob, {
			build: false,
			tenantId: testTenantId,
			elsaMetadataDatabaseName: testTenantId,
			deployDevelopmentTextsOnly: true
		});
	});

	it('shall run the provisioning baseline test tenant jobs using the custom envs', async function () {
		process.env.MOCHA_SETUP = 'LOCAL';
		process.env.ELSA_DEPLOY_ALL_TEXTS = 'true';
		await provisionBaselineTestTenant(testTenantId);
		sinon.assert.calledOnceWithExactly(startDatabaseSetupJob, { build: true, elsaMetadataDatabaseName: testTenantId });
		sinon.assert.calledOnceWithExactly(startProvisionClusterJob, {
			build: true,
			tenantId: testTenantId,
			elsaMetadataDatabaseName: testTenantId,
			deployDevelopmentTextsOnly: true
		});
		sinon.assert.calledOnceWithExactly(startProvisionTenantJob, {
			build: true,
			tenantId: testTenantId,
			elsaMetadataDatabaseName: testTenantId,
			deployDevelopmentTextsOnly: false,
			transientStorage: 'redis'
		});
		sinon.assert.calledOnceWithExactly(startProvisionTestContentJob, {
			build: true,
			tenantId: testTenantId,
			elsaMetadataDatabaseName: testTenantId,
			deployDevelopmentTextsOnly: false
		});
	});
});
