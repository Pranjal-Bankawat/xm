'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let dropMetadataDatabase, dropTestTenant, dropSchema;

describe('db/dropTestTenant', function () {
	before(function () {
		this.timeout(0);
		dropMetadataDatabase = sinon.stub();
		dropSchema = sinon.stub();
		dropTestTenant = rewiremock.proxy(() => require('../../src/db/dropTestTenant'), {
			[require.resolve('../../src/db/dropMetadataDatabase')]: dropMetadataDatabase,
			[require.resolve('../../src/db/dropSchema')]: dropSchema
		});
	});

	beforeEach(function () {
		dropMetadataDatabase.reset();
	});

	it('shall delete all test tenant metadata and content', async function () {
		await dropTestTenant('someTestTenant', 'someTestTenantMDDB');
		sinon.assert.calledOnce(dropMetadataDatabase);
		sinon.assert.calledWith(dropMetadataDatabase, 'someTestTenantMDDB');
		sinon.assert.calledOnce(dropSchema);
		sinon.assert.calledWith(dropSchema, 'someTestTenant');
	});
});
