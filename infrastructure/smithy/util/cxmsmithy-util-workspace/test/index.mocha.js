'use strict';

const _get = require('../src/get');
const _getRoot = require('../src/getRoot');
const _getRootDirectory = require('../src/getRootDirectory');
const { get, getRoot, getRootDirectory } = require('../src/index.js');

const assert = require('assert');

describe('index', function () {
	it('shall expose get', function () {
		assert.strictEqual(get, _get);
	});

	it('shall expose getRoot', function () {
		assert.strictEqual(getRoot, _getRoot);
	});

	it('shall expose getRootDirectory', function () {
		assert.strictEqual(getRootDirectory, _getRootDirectory);
	});
});
