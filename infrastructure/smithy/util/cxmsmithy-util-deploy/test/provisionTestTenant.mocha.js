'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let testTenantId, provisionTestTenant, startProvisionTenantJob, startProvisionTestContentJob;

describe('provisionTestTenant', function () {
	before(function () {
		this.timeout(0);
		testTenantId = 'theTestTenant';
		startProvisionTenantJob = sinon.stub();
		startProvisionTestContentJob = sinon.stub();
		provisionTestTenant = rewiremock.proxy(() => require('../src/provisionTestTenant'), {
			[require.resolve('../src/startProvisionTenantJob.js')]: startProvisionTenantJob,
			[require.resolve('../src/startProvisionTestContentJob.js')]: startProvisionTestContentJob
		});
	});

	beforeEach(function () {
		startProvisionTenantJob.resetHistory();
		startProvisionTestContentJob.resetHistory();
	});

	it('shall run the provisioning test tenant jobs using the default args', async function () {
		await provisionTestTenant(testTenantId);
		sinon.assert.calledOnceWithExactly(startProvisionTenantJob, {
			build: false,
			tenantId: testTenantId,
			deployDevelopmentTextsOnly: false,
			transientStorage: 'None',
			disablePublishingOfEvents: true
		});
		sinon.assert.calledOnceWithExactly(startProvisionTestContentJob, {
			build: false,
			tenantId: testTenantId,
			deployDevelopmentTextsOnly: false,
			transientStorage: 'None',
			disablePublishingOfEvents: true
		});
	});

	it('shall run the provisioning test tenant jobs using the custom args', async function () {
		await provisionTestTenant(testTenantId, { disablePublishingOfEvents: false }, 'Some');
		sinon.assert.calledOnceWithExactly(startProvisionTenantJob, {
			build: false,
			tenantId: testTenantId,
			deployDevelopmentTextsOnly: false,
			transientStorage: 'Some',
			disablePublishingOfEvents: false
		});
		sinon.assert.calledOnceWithExactly(startProvisionTestContentJob, {
			build: false,
			tenantId: testTenantId,
			deployDevelopmentTextsOnly: false,
			transientStorage: 'Some',
			disablePublishingOfEvents: false
		});
	});
});
