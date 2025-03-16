'use strict';

const { execute, executeSync } = require('../src/index');
const AsyncTask = require('../src/AsyncTask');
const SyncTask = require('../src/SyncTask');
const sinon = require('sinon');

describe('index', function () {
	beforeEach(function () {
		sinon.stub(AsyncTask, 'execute');
		sinon.stub(SyncTask, 'execute');
	});

	afterEach(function () {
		AsyncTask.execute.restore();
		SyncTask.execute.restore();
	});

	it('shall expose the async execute function', function () {
		execute('someArgs');
		sinon.assert.calledOnce(AsyncTask.execute);
		sinon.assert.calledWith(AsyncTask.execute, 'someArgs');
	});

	it('shall expose the sync execute function', function () {
		executeSync('someArgs');
		sinon.assert.calledOnce(SyncTask.execute);
		sinon.assert.calledWith(SyncTask.execute, 'someArgs');
	});
});
