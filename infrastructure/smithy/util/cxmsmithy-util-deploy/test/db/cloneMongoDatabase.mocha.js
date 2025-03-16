'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let cloneMongoDatabase, createMongoClient, mongoClient, sourceDb, targetDb, console;

describe('db/cloneMongoDatabase', function () {
	before(function () {
		this.timeout(0);
		createMongoClient = sinon.stub();
		console = {
			log: sinon.stub(),
			error: sinon.stub()
		};
		cloneMongoDatabase = rewiremock.proxy(() => require('../../src/db/cloneMongoDatabase'), {
			[require.resolve('../../src/db/createMongoClient')]: createMongoClient,
			'node:console': console
		});
	});

	beforeEach(function () {
		console.log.reset();
		console.error.reset();
		sourceDb = {
			collection: sinon.stub().returnsThis(),
			listCollections: sinon.stub().returnsThis(),
			toArray: sinon.stub()
		};
		targetDb = {
			collection: sinon.stub().returnsThis(),
			insertMany: sinon.stub(),
			createIndexes: sinon.stub()
		};
		mongoClient = {
			db: sinon.stub(),
			close: sinon.stub()
		};
		mongoClient.db.withArgs('source').returns(sourceDb);
		mongoClient.db.withArgs('target').returns(targetDb);
		createMongoClient.reset();
		createMongoClient.returns(mongoClient);
	});

	it('shall clone the source database to the target database and finally close the client', async function () {
		sourceDb.toArray.resolves([{ name: 'collection1' }, { name: 'collection2' }]);
		sourceDb.collection.withArgs('collection1').returns({
			indexes: sinon.stub().resolves([{ name: '_id_' }, { name: 'index1', key: { name: 1 } }]),
			find: sinon.stub().returnsThis(),
			toArray: sinon.stub().resolves([{ _id: 1, name: 'John Doe' }])
		});
		sourceDb.collection.withArgs('collection2').returns({
			indexes: sinon.stub().resolves([{ name: '_id_' }]),
			find: sinon.stub().returnsThis(),
			toArray: sinon.stub().resolves([{ _id: 2, name: 'Jane Doe' }])
		});
		await cloneMongoDatabase('source', 'target');
		sinon.assert.calledWith(mongoClient.db, 'source');
		sinon.assert.calledWith(mongoClient.db, 'target');
		sinon.assert.calledWith(sourceDb.listCollections);
		sinon.assert.calledWith(sourceDb.toArray);
		sinon.assert.calledWith(sourceDb.collection, 'collection1');
		sinon.assert.calledWith(sourceDb.collection, 'collection2');
		sinon.assert.calledWith(targetDb.collection, 'collection1');
		sinon.assert.calledWith(targetDb.collection, 'collection2');
		sinon.assert.calledWith(targetDb.insertMany, [{ _id: 1, name: 'John Doe' }]);
		sinon.assert.calledWith(targetDb.insertMany, [{ _id: 2, name: 'Jane Doe' }]);
		sinon.assert.calledWith(targetDb.createIndexes, [{ key: { name: 1 } }]);
		sinon.assert.calledWith(mongoClient.close);
	});

	it('shall log and rethrow any error but finally close the client', async function () {
		sourceDb.toArray.rejects(new Error('Test error'));
		await cloneMongoDatabase('source', 'target').catch(() => {});
		sinon.assert.calledWith(console.error, sinon.match.instanceOf(Error));
		sinon.assert.calledWith(mongoClient.close);
	});
});
