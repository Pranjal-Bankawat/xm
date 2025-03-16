'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let dropBaselineTestTenant, dropTestTenant, dropSchema;

describe('db/dropBaselineTestTenant', function () {
	before(function () {
		this.timeout(0);
		dropTestTenant = sinon.stub();
		dropSchema = sinon.stub();
		dropBaselineTestTenant = rewiremock.proxy(() => require('../../src/db/dropBaselineTestTenant'), {
			[require.resolve('../../src/db/dropTestTenant')]: dropTestTenant,
			[require.resolve('../../src/db/dropSchema')]: dropSchema
		});
	});

	beforeEach(function () {
		dropTestTenant.reset();
		dropSchema.reset();
	});

	it('shall drop the baseline tenant metadata and content', async function () {
		await dropBaselineTestTenant();
		sinon.assert.calledOnce(dropTestTenant);
		sinon.assert.calledWith(dropTestTenant, 'BaselineTestTenant', 'BaselineTestTenant');
	});
	it('shall drop the baseline codes tenant content', async function () {
		await dropBaselineTestTenant();
		sinon.assert.calledOnce(dropSchema);
		sinon.assert.calledWith(dropSchema, 'BaselineCodes');
	});
});
