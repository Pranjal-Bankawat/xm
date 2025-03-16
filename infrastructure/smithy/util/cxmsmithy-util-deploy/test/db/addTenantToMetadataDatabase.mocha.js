'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let createMongoClient, addTenantToMetadataDatabase, mongoClient, mongoDB, mongoCollection;
let nodeConsole;

describe('db/addTenantToMetadataDatabase', function () {
	before(function () {
		this.timeout(0);

		nodeConsole = {
			error: sinon.stub()
		};

		createMongoClient = sinon.stub();
		addTenantToMetadataDatabase = rewiremock.proxy(() => require('../../src/db/addTenantToMetadataDatabase'), {
			'node:console': nodeConsole,
			[require.resolve('../../src/db/createMongoClient')]: createMongoClient
		});
	});

	beforeEach(function () {
		nodeConsole.error.resetHistory();

		mongoCollection = {
			deleteOne: sinon.stub().resolves(),
			insertOne: sinon.stub().resolves()
		};
		mongoDB = {
			collection: sinon.stub().returns(mongoCollection)
		};
		mongoClient = {
			close: sinon.stub().resolves(),
			connect: sinon.stub().resolves(),
			db: sinon.stub().returns(mongoDB)
		};
		createMongoClient.reset();

		createMongoClient.returns(mongoClient);
	});

	it('shall add tenant to tenant collection', async function () {
		await addTenantToMetadataDatabase('tenantId', 'elsaMetadata');
		sinon.assert.calledOnce(createMongoClient);
		sinon.assert.calledOnce(mongoClient.connect);
		sinon.assert.calledOnce(mongoClient.db);
		sinon.assert.calledWith(mongoClient.db, 'elsaMetadata');
		sinon.assert.calledOnce(mongoCollection.deleteOne);
		sinon.assert.calledWith(mongoCollection.deleteOne, { tenantId: 'tenantId' });
		sinon.assert.calledOnce(mongoCollection.insertOne);
		sinon.assert.calledOnce(mongoClient.close);
	});

	it('shall and log error if mongo connection cannot be closed', async function () {
		mongoClient.close.rejects('boom');

		await addTenantToMetadataDatabase('someDifferent', 'elsaOtherMetadata');

		sinon.assert.calledOnce(nodeConsole.error);
		sinon.assert.calledWith(nodeConsole.error, 'Failed to close connection to database elsaOtherMetadata due to boom');
	});

	it('shall log an error if connect fails', async function () {
		mongoClient.connect.rejects('boomer');
		await addTenantToMetadataDatabase('someOtherTenantId', 'someTestTenantMDDB');

		sinon.assert.calledOnce(nodeConsole.error);
		sinon.assert.calledWith(nodeConsole.error, 'Failed to add tenant someOtherTenantId to database someTestTenantMDDB due to boomer');
	});
});
