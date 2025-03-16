'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('assert');
const sinon = require('sinon');

describe('npm', function () {
	let Task, npm;

	before(function () {
		this.timeout(0);
		Task = {
			executeSync: sinon.stub()
		};

		npm = rewiremock.proxy(() => require('../src/npm'), {
			'@sapn/elsa-util-task': Task
		});
	});

	beforeEach(function () {
		Task.executeSync
			.withArgs('npm -v', [], {
				shell: true,
				stdio: 'pipe'
			})
			.returns({ code: 0, stdout: '6.12.8' });
		Task.executeSync
			.withArgs('npm view npm version', [], {
				shell: true,
				stdio: 'pipe'
			})
			.returns({ code: 0, stdout: '6.14.8' });
	});

	afterEach(function () {
		Task.executeSync.reset();
	});

	describe('getCurrentNpmVersion()', function () {
		it('shall return the current npm version', function () {
			assert.strictEqual(npm.getCurrentNpmVersion(), '6.12.8');
		});

		it('shall throw if there is an error getting the current npm version', function () {
			Task.executeSync
				.withArgs('npm -v', [], {
					shell: true,
					stdio: 'pipe'
				})
				.returns({ code: 1, stderr: 'CurrentNpmVersionError' });

			assert.throws(() => npm.getCurrentNpmVersion(), /CurrentNpmVersionError/);
		});
	});

	describe('getLatestNpmVersion()', function () {
		it('shall return the latest npm version', function () {
			assert.strictEqual(npm.getLatestNpmVersion(), '6.14.8');
		});

		it('shall throw if there is an error getting the latest npm version', function () {
			Task.executeSync
				.withArgs('npm view npm version', [], {
					shell: true,
					stdio: 'pipe'
				})
				.returns({ code: 1, stderr: 'LatestNpmVersionError' });

			assert.throws(() => npm.getLatestNpmVersion(), /LatestNpmVersionError/);
		});
	});
});
