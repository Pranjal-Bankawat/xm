'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let createMongoClient, dropMetadataDatabase, mongoClient, mongoDB;
let nodeConsole;

describe('db/dropMetadataDatabase', function () {
	before(function () {
		this.timeout(0);

		nodeConsole = {
			error: sinon.stub()
		};

		createMongoClient = sinon.stub();
		dropMetadataDatabase = rewiremock.proxy(() => require('../../src/db/dropMetadataDatabase'), {
			'node:console': nodeConsole,
			[require.resolve('../../src/db/createMongoClient')]: createMongoClient
		});
	});

	beforeEach(function () {
		nodeConsole.error.resetHistory();

		mongoDB = {
			dropDatabase: sinon.stub()
		};
		mongoClient = {
			close: sinon.stub().resolves(),
			connect: sinon.stub().resolves(),
			db: sinon.stub().returns(mongoDB)
		};
		createMongoClient.reset();

		createMongoClient.returns(mongoClient);
	});

	it('shall drop the metadata database', async function () {
		await dropMetadataDatabase('someTestTenantMDDB');
		sinon.assert.calledOnce(createMongoClient);
		sinon.assert.calledOnce(mongoClient.connect);
		sinon.assert.calledOnce(mongoClient.db);
		sinon.assert.calledWith(mongoClient.db, 'someTestTenantMDDB');
		sinon.assert.calledOnce(mongoDB.dropDatabase);
		sinon.assert.calledOnce(mongoClient.close);
	});

	it('shall and log error if mongo connection cannot be closed', async function () {
		mongoClient.close.rejects('boom');

		await dropMetadataDatabase('someTestTenantMDDB');

		sinon.assert.calledOnce(nodeConsole.error);
		sinon.assert.calledWith(nodeConsole.error, 'Failed to close connection to database someTestTenantMDDB due to boom');
	});

	it('shall log an error if connect fails', async function () {
		mongoClient.connect.rejects('boom');
		await dropMetadataDatabase('someTestTenantMDDB');

		sinon.assert.calledOnce(nodeConsole.error);
		sinon.assert.calledWith(nodeConsole.error, 'Failed to drop database someTestTenantMDDB due to boom');
	});
});
