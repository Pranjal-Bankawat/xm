'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('assert');
const sinon = require('sinon');

describe('cache', function () {
	let Task, cache;

	before(function () {
		this.timeout(0);
		Task = {
			executeSync: sinon.stub()
		};

		cache = rewiremock.proxy(() => require('../src/cache'), {
			'@sapn/elsa-util-task': Task
		});
	});

	beforeEach(function () {
		Task.executeSync.returns({ code: 1 });
	});

	afterEach(function () {
		Task.executeSync.reset();
	});

	describe('isNpmCacheCorrupted()', function () {
		it('shall return true if the npm cache is corrupted', function () {
			assert.strictEqual(cache.isNpmCacheCorrupted(), true);
		});

		it('shall return false if npm cache is healthy', function () {
			Task.executeSync.returns({ code: 0 });

			assert.strictEqual(cache.isNpmCacheCorrupted(), false);
		});
	});
});
