'use strict';

const MetadataDatabaseConstants = require('@sapn/constants/MetadataDatabase');
const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let createMongoClient, deleteTestTenantMetadata, mongoClient, mongoDB, mongoCollection;

describe('db/deleteTestTenantMetadata', function () {
	before(function () {
		this.timeout(0);
		createMongoClient = sinon.stub();
		deleteTestTenantMetadata = rewiremock.proxy(() => require('../../src/db/deleteTestTenantMetadata'), {
			[require.resolve('../../src/db/createMongoClient')]: createMongoClient
		});
	});

	beforeEach(function () {
		mongoCollection = {
			deleteMany: sinon.stub().resolves()
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

	it('shall delete all test tenant metadata', async function () {
		await deleteTestTenantMetadata('someTenant', 'someMDDB');
		sinon.assert.calledOnce(createMongoClient);
		sinon.assert.calledOnce(mongoClient.connect);
		sinon.assert.calledOnce(mongoClient.db);
		sinon.assert.calledWith(mongoClient.db, 'someMDDB');
		sinon.assert.callCount(mongoDB.collection, MetadataDatabaseConstants.ALL_COLLECTION_NAMES.length);
		sinon.assert.callCount(mongoCollection.deleteMany, MetadataDatabaseConstants.ALL_COLLECTION_NAMES.length);
		sinon.assert.calledWith(mongoCollection.deleteMany, { tenantId: 'someTenant' });
		sinon.assert.calledOnce(mongoClient.close);
	});
});
