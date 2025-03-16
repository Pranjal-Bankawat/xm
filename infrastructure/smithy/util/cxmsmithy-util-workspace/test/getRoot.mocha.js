'use strict';

const rewiremock = require('rewiremock/node');
const { resolve } = require('node:path');
const assert = require('assert');
const sinon = require('sinon');

const workspaceRootDirectory = resolve(__dirname, '../../../');

let fs, getRoot, getRootDirectory;

describe('getRoot', function () {
	before(function () {
		this.timeout(0);
		getRootDirectory = sinon.stub().returns(workspaceRootDirectory);
		fs = {
			readFileSync: sinon.stub()
		};

		getRoot = rewiremock.proxy(() => require('../src/getRoot'), {
			[require.resolve('../src/getRootDirectory')]: getRootDirectory,
			'node:fs': fs
		});
	});

	beforeEach(function () {
		fs.readFileSync.reset();
		fs.readFileSync.withArgs(resolve(workspaceRootDirectory, 'package.json')).returns(JSON.stringify({ name: 'someRootName', version: 'someRootVersion' }));
	});

	it('shall return the root workspace metadata', function () {
		assert.deepStrictEqual(getRoot(), {
			location: workspaceRootDirectory,
			name: 'someRootName',
			version: 'someRootVersion'
		});
	});
});
