'use strict';

const assert = require('node:assert');
const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let createPostgresClient, environment, pg, pgClient;

describe('db/createPostgresClient', function () {
	before(function () {
		this.timeout(0);

		environment = {};
		environment.PGHOST = 'someHost';
		environment.PGPORT = 'somePort';
		pg = {
			Client: sinon.stub()
		};
		createPostgresClient = rewiremock.proxy(() => require('../../src/db/createPostgresClient'), {
			pg,
			'@sapn/environment': environment
		});
	});

	beforeEach(function () {
		pgClient = sinon.stub();
		pg.Client.reset();
		pg.Client.returns(pgClient);
	});

	it('shall return the postgres client', function () {
		assert.strictEqual(createPostgresClient(), pgClient);
		sinon.assert.calledOnceWithExactly(pg.Client, { user: 'elsa', host: environment.PGHOST, port: environment.PGPORT });
	});
});
