'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('assert');
const sinon = require('sinon');

let Repository, Task, getWorkspaceRootDirectory;

describe('Repository', function () {
	before(function () {
		this.timeout(0);
		Task = {
			executeSync: sinon.stub()
		};

		getWorkspaceRootDirectory = sinon.stub();

		Repository = rewiremock.proxy(() => require('../src/Repository'), {
			'@sapn/elsa-util-task': Task,
			'@sapn/elsa-util-workspace/getRootDirectory': getWorkspaceRootDirectory
		});
	});

	beforeEach(function () {
		Task.executeSync.reset();
	});

	describe('remote', function () {
		it('shall throw exception if code !== 0', function () {
			Task.executeSync.returns({ code: 1, stderr: 'RemoteError' });
			assert.throws(() => Repository.remote, /RemoteError/);
			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git remote', [], { shell: true, stdio: 'pipe' });
		});

		it('shall return the configured remote', function () {
			Task.executeSync.returns({ code: 0, stdout: 'remote' });
			assert.strictEqual(Repository.remote, 'remote');
			sinon.assert.calledWith(Task.executeSync, 'git remote', [], { shell: true, stdio: 'pipe' });
		});

		it('shall return the default remote', function () {
			Task.executeSync.returns({ code: 0 });
			assert.strictEqual(Repository.remote, 'origin');
			sinon.assert.calledWith(Task.executeSync, 'git remote', [], { shell: true, stdio: 'pipe' });
		});
	});

	describe('targets', function () {
		beforeEach(function () {
			Task.executeSync.withArgs('git remote', [], { shell: true, stdio: 'pipe' }).returns({ code: 0 });
		});

		it('shall throw exception if code !== 0', function () {
			Task.executeSync.returns({ code: 1, stderr: 'TargetsError' });
			assert.throws(() => Repository.targets, /TargetsError/);
			sinon.assert.calledWith(Task.executeSync.secondCall, "git branch --remote --list 'origin/release/*'", [], {
				shell: true,
				stdio: 'pipe'
			});
		});

		it('shall return default targets', function () {
			Task.executeSync.returns({ code: 0 });
			assert.deepStrictEqual(Repository.targets, ['origin/main', 'origin/hotfix']);
			sinon.assert.calledWith(Task.executeSync.secondCall, "git branch --remote --list 'origin/release/*'", [], {
				shell: true,
				stdio: 'pipe'
			});
		});

		it('shall return targets', function () {
			Task.executeSync.returns({ code: 0, stdout: 'origin/release/2006\norigin/release/2007\n' });
			assert.deepStrictEqual(Repository.targets, ['origin/main', 'origin/hotfix', 'origin/release/2006', 'origin/release/2007']);
			sinon.assert.calledWith(Task.executeSync.secondCall, "git branch --remote --list 'origin/release/*'", [], {
				shell: true,
				stdio: 'pipe'
			});
		});
	});

	describe('untrackedFiles', function () {
		it('shall return untracked git files', function () {
			Task.executeSync.returns({ code: 0, stdout: 'some/file\nsome/other/file' });
			assert.deepStrictEqual(Repository.untrackedFiles(), ['some/file', 'some/other/file']);
		});

		it('shall throw exception if code !== 0', function () {
			Task.executeSync.returns({ code: 1, stderr: 'ErrorWithUntrackedFiles' });
			assert.throws(() => Repository.untrackedFiles(), /ErrorWithUntrackedFiles/);
		});
	});

	describe('checkout', function () {
		it('shall checkout given files', function () {
			getWorkspaceRootDirectory.returns('project/root/directory');
			Task.executeSync.returns({ code: 0 });

			Repository.checkout(['some/file', 'some/other/file']);

			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git checkout -- some/file some/other/file', [], {
				shell: true,
				stdio: 'pipe',
				cwd: 'project/root/directory'
			});
		});

		it('shall throw exception if code !== 0', function () {
			Task.executeSync.returns({ code: 1, stderr: 'ErrorWithCheckout' });
			assert.throws(() => Repository.checkout(['some/file', 'some/other/file']), /ErrorWithCheckout/);
		});
	});
});
