'use strict';

const assert = require('node:assert');
const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let createTestUtilMongoClient, createMongoClient, environment;

describe('db/createMongoClient', function () {
	before(function () {
		this.timeout(0);

		environment = {};
		environment.MONGO_HOST = 'someHost';
		environment.MONGO_PORT = 'somePort';
		environment.MONGO_REPLICA_SET_NAME = 'someReplicaSetName';
		createMongoClient = sinon.stub();
		createTestUtilMongoClient = rewiremock.proxy(() => require('../../src/db/createMongoClient'), {
			'@sapn/mongodb/createMongoClient': createMongoClient,
			'@sapn/environment': environment
		});
	});

	beforeEach(function () {
		createMongoClient.reset();
		createMongoClient.returns('mongoClient');
	});

	it('shall return the mongo client', function () {
		assert.strictEqual(createTestUtilMongoClient(), 'mongoClient');
		sinon.assert.calledOnceWithExactly(createMongoClient, {
			hostname: environment.MONGO_HOST,
			port: environment.MONGO_PORT,
			replicaSet: environment.MONGO_REPLICA_SET_NAME,
			connectionOptions: { minPoolSize: 0, maxPoolSize: 2 }
		});
	});
});
