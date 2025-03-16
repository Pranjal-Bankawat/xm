'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('assert');
const sinon = require('sinon');

let Branch, Repository, Task, branch;

describe('Branch', function () {
	before(function () {
		this.timeout(0);
		Task = {
			executeSync: sinon.stub()
		};

		Repository = {
			targets: ['origin/main', 'origin/hotfix']
		};

		Branch = rewiremock.proxy(() => require('../src/Branch'), {
			'@sapn/elsa-util-task': Task,
			[require.resolve('../src/Repository')]: Repository
		});
	});

	beforeEach(function () {
		Task.executeSync.reset();
		branch = new Branch('branch');
	});

	describe('#hash', function () {
		it('shall throw exception if code !== 0', function () {
			Task.executeSync.returns({ code: 1, stderr: 'HashError' });
			assert.throws(() => branch.hash, /HashError/);
			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git rev-parse branch', [], { shell: true, stdio: 'pipe' });
		});

		it('shall return the branch HEAD commit hash', function () {
			Task.executeSync.returns({ code: 0, stdout: 'someHash' });
			assert.strictEqual(branch.hash, 'someHash');
			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git rev-parse branch', [], { shell: true, stdio: 'pipe' });
		});
	});

	describe('#upstream', function () {
		it('shall return the upstream hash', function () {
			Task.executeSync.withArgs('git rev-parse branch@{upstream}').returns({ code: 0, stdout: 'someUpstreamHash' });
			assert.strictEqual(branch.upstream, 'someUpstreamHash');
		});

		it('shall walk down the revision list and return the first commit hash which is contained in remote deployment branch', function () {
			Task.executeSync.withArgs('git rev-parse branch@{upstream}').returns({ code: 1 });
			Task.executeSync.withArgs('git rev-list HEAD -100').returns({ code: 0, stdout: 'hash1\nhash2\n' });
			Task.executeSync.withArgs('git rev-list hash2 -100').returns({ code: 0, stdout: 'hash3\nhash4\n' });
			Task.executeSync.withArgs('git branch --remote --contains HEAD').returns({ code: 0, stdout: '\n' });
			Task.executeSync.withArgs('git branch --remote --contains hash1').returns({ code: 0, stdout: '\n' });
			Task.executeSync.withArgs('git branch --remote --contains hash2').returns({ code: 0, stdout: '\n' });
			Task.executeSync.withArgs('git branch --remote --contains hash3').returns({
				code: 0,
				stdout: 'origin/feature1\n'
			});
			Task.executeSync.withArgs('git branch --remote --contains hash4').returns({
				code: 0,
				stdout: 'origin/main\norigin/hotfix\n'
			});
			assert.strictEqual(branch.upstream, 'hash4');
		});

		it('shall throw exception if walking down revision list fails', function () {
			Task.executeSync.withArgs('git rev-parse branch@{upstream}').returns({ code: 1 });
			Task.executeSync.withArgs('git rev-list HEAD -100').returns({ code: 1, stderr: 'RevListError' });
			assert.throws(() => branch.upstream, /RevListError/);
		});
	});

	describe('#upstreamReference', function () {
		it('shall return the upstream reference', function () {
			Task.executeSync.withArgs('git rev-parse --abbrev-ref --symbolic-full-name @{upstream}').returns({
				code: 0,
				stdout: 'someUpstreamReference'
			});
			assert.strictEqual(branch.upstreamReference, 'someUpstreamReference');
		});

		it('shall throw exception if code !== 0', function () {
			Task.executeSync.withArgs('git rev-parse --abbrev-ref --symbolic-full-name @{upstream}').returns({
				code: 1,
				stderr: 'UpstreamReferenceError'
			});
			assert.strictEqual(branch.upstreamReference, undefined);
		});
	});

	describe('#[Symbol.toPrimitive]()', function () {
		it('shall return the branch string', function () {
			assert.strictEqual(`${branch}`, 'branch');
			assert.strictEqual(branch[Symbol.toPrimitive](), 'branch');
		});
	});

	describe('contains()', function () {
		it('shall throw exception if code !== 0', function () {
			Task.executeSync.returns({ code: 1, stderr: 'ContainsError' });
			assert.throws(() => Branch.contains('someHash'), /ContainsError/);
			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git branch --remote --contains someHash', [], {
				shell: true,
				stdio: 'pipe'
			});
		});

		it('shall return the [branches] containing the hash', function () {
			Task.executeSync.returns({ code: 0, stdout: 'origin/main\norigin/hotfix\n' });
			assert.deepStrictEqual(Branch.contains('someHash'), ['origin/main', 'origin/hotfix']);
			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git branch --remote --contains someHash', [], {
				shell: true,
				stdio: 'pipe'
			});
		});
	});

	describe('create()', function () {
		it('shall return an instance of branch', function () {
			assert.strictEqual(Branch.create('someBranch') instanceof Branch, true);
		});

		it('shall always return the same instance for the provided branch', function () {
			assert.strictEqual(Branch.create('someBranch'), Branch.create('someBranch'));
		});
	});
});
