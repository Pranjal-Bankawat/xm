'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('assert');
const sinon = require('sinon');

let dropSchema, createPostgresClient, pgClient, nodeConsole;

const expectedDropStatement = 'DROP SCHEMA IF EXISTS "someTestTenant" CASCADE';
describe('db/dropSchema', function () {
	before(function () {
		this.timeout(0);
		createPostgresClient = sinon.stub();
		nodeConsole = {};
		dropSchema = rewiremock.proxy(() => require('../../src/db/dropSchema'), {
			'node:console': nodeConsole,
			[require.resolve('../../src/db/createPostgresClient')]: createPostgresClient
		});
	});

	beforeEach(function () {
		nodeConsole.error = sinon.stub();
		pgClient = {
			connect: sinon.stub().resolves(),
			query: sinon.stub().resolves(),
			end: sinon.stub().resolves()
		};
		createPostgresClient.reset();
		createPostgresClient.returns(pgClient);
	});

	it('shall delete all test tenant metadata and content', async function () {
		await dropSchema('someTestTenant');
		sinon.assert.calledOnce(createPostgresClient);
		sinon.assert.calledOnce(pgClient.connect);
		sinon.assert.calledOnce(pgClient.query);
		sinon.assert.calledWith(pgClient.query, expectedDropStatement);
		sinon.assert.calledOnce(pgClient.end);
	});

	it('shall log error if connect fails', async function () {
		pgClient.connect.rejects('failed to connect');

		await dropSchema('someTestTenant');

		sinon.assert.calledOnce(nodeConsole.error);
		sinon.assert.calledWith(nodeConsole.error, `Failed to drop schema ${expectedDropStatement} due to failed to connect`);
	});
	it('shall log error if end fails', async function () {
		pgClient.query.rejects('boom');
		pgClient.end.rejects('failed to end');

		await dropSchema('someTestTenant');

		sinon.assert.calledTwice(nodeConsole.error);
		assert.strictEqual(nodeConsole.error.firstCall.firstArg, `Failed to drop schema ${expectedDropStatement} due to boom`);
		assert.strictEqual(nodeConsole.error.secondCall.firstArg, 'Failed to end PG Client due to failed to end');
	});
});
