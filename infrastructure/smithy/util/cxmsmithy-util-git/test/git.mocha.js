'use strict';

const assert = require('assert');
const sinon = require('sinon');
const Branch = require('../src/Branch');
const Reference = require('../src/Reference');
const Repository = require('../src/Repository');

const HEAD = Symbol('HEAD');
let git;

describe('git', function () {
	before(function () {
		sinon.stub(Reference, 'create').withArgs('HEAD').returns(HEAD);
		sinon.stub(Branch, 'create').withArgs(HEAD).returns(HEAD);
		delete require.cache[require.resolve('../src/git')];
		git = require('../src/git');
	});

	after(function () {
		Reference.create.restore();
		Branch.create.restore();
		delete require.cache[require.resolve('../src/git')];
	});

	it('shall return the Branch API', function () {
		assert.strictEqual(git.Branch, Branch);
	});

	it('shall return the current (HEAD) branch', function () {
		assert.strictEqual(git.Current, HEAD);
	});

	it('shall return the HEAD Reference', function () {
		assert.strictEqual(git.HEAD, HEAD);
	});

	it('shall return the Reference API', function () {
		assert.strictEqual(git.Reference, Reference);
	});

	it('shall return the Repository API', function () {
		assert.strictEqual(git.Repository, Repository);
	});
});
