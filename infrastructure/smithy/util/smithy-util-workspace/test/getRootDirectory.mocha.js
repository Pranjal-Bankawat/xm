'use strict';

const rewiremock = require('rewiremock/node');
const { resolve } = require('node:path');
const assert = require('assert');
const sinon = require('sinon');

const workspaceRootDirectory = resolve(__dirname, '../../../');

let fs, getRootDirectory;

describe('getRootDirectory', function () {
	before(function () {
		this.timeout(0);
		fs = {
			existsSync: sinon.stub()
		};

		getRootDirectory = rewiremock.proxy(() => require('../src/getRootDirectory'), {
			'node:fs': fs
		});
	});

	beforeEach(function () {
		fs.existsSync.reset();
	});

	it('shall return the workspace root directory', function () {
		fs.existsSync.returns(false);
		fs.existsSync.withArgs(resolve(workspaceRootDirectory, 'nx.json')).returns(true);
		assert.strictEqual(getRootDirectory(), workspaceRootDirectory);
		assert.strictEqual(getRootDirectory(__dirname), workspaceRootDirectory);
	});

	it('shall return undefined if no valid file tree is provided', function () {
		fs.existsSync.returns(false);
		assert.strictEqual(getRootDirectory('/some/invalid/path'), undefined);
	});
});
