'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');
const assert = require('assert');
const { join } = require('node:path');

let buf, Task, getWorkspaces, workspaces, fs, minimatch;

describe('buf', function () {
	before(function () {
		this.timeout(0);
		workspaces = {
			firstPackage: {
				name: 'firstPackage',
				location: '/path/to/firstPackage',
				context: 'firstPackage'
			},
			secondPackage: {
				name: 'secondPackage',
				location: '/path/to/secondPackage',
				context: 'secondPackage'
			}
		};

		Task = {
			execute: sinon.stub().returns({ stdout: '' })
		};

		getWorkspaces = sinon.stub().returns(workspaces);

		fs = {
			mkdir: sinon.stub().resolves(),
			writeFile: sinon.stub().resolves()
		};
		minimatch = sinon.stub();
		buf = rewiremock.proxy(() => require('../src/buf'), {
			'@sapn/elsa-util-task': Task,
			'@sapn/elsa-util-workspace/get': getWorkspaces,
			'node:fs/promises': fs,
			minimatch: { minimatch }
		});
	});

	beforeEach(function () {
		Task.execute.resetHistory();
		getWorkspaces.resetHistory();
		fs.mkdir.resetHistory();
		fs.writeFile.resetHistory();
	});

	describe('#lint()', function () {
		it('shall execute corresponding buf lint command for each file provided', async function () {
			await buf.lint({ files: ['someFile', 'someSecondFile'] });
			sinon.assert.calledTwice(Task.execute);
			assert.deepStrictEqual(Task.execute.getCall(0).args, [
				'buf lint --path someFile --error-format=json',
				[],
				{
					shell: true,
					stdio: 'pipe'
				}
			]);

			assert.deepStrictEqual(Task.execute.getCall(1).args, [
				'buf lint --path someSecondFile --error-format=json',
				[],
				{
					shell: true,
					stdio: 'pipe'
				}
			]);
		});

		it('shall be able to generate corresponding reports', async function () {
			Task.execute.onFirstCall().resolves({ stdout: 'error1\nerror2' });
			Task.execute.onSecondCall().resolves({ stdout: 'Fehler' });
			minimatch.withArgs('path/to/firstPackage/firstFile', join(workspaces.firstPackage.context, '**')).returns(true);
			minimatch.withArgs('path/to/secondPackage/secondFile', join(workspaces.secondPackage.context, '**')).returns(true);

			await buf.lint({ files: ['path/to/firstPackage/firstFile', 'path/to/secondPackage/secondFile'] });

			sinon.assert.calledTwice(fs.mkdir);
			sinon.assert.calledTwice(fs.writeFile);

			assert.deepStrictEqual(fs.mkdir.getCall(0).args, [
				'/path/to/firstPackage/report/buf',
				{
					recursive: true
				}
			]);
			assert.deepStrictEqual(fs.mkdir.getCall(1).args, [
				'/path/to/secondPackage/report/buf',
				{
					recursive: true
				}
			]);

			assert.deepStrictEqual(fs.writeFile.getCall(0).args, ['/path/to/firstPackage/report/buf/buf.json', JSON.stringify({ errors: ['error1', 'error2'] })]);
			assert.deepStrictEqual(fs.writeFile.getCall(1).args, ['/path/to/secondPackage/report/buf/buf.json', JSON.stringify({ errors: ['Fehler'] })]);
		});
	});

	describe('#lintAll()', function () {
		it('shall execute buff corresponding command for getting all proto files', async function () {
			await buf.lintAll();
			assert.deepStrictEqual(Task.execute.getCall(0).args, [
				'buf ls-files',
				[],
				{
					shell: true,
					stdio: 'pipe'
				}
			]);
		});
	});

	describe('#breaking()', function () {
		it('shall fetch getRef if not provided', async function () {
			const mockGitRef = 'someGitCommitHash\n';
			Task.execute.onFirstCall().resolves({ stdout: mockGitRef });

			await buf.breaking({ files: ['someFile'] });

			assert.deepStrictEqual(Task.execute.getCall(0).args, [
				'git rev-parse remotes/origin/main',
				[],
				{
					shell: true,
					stdio: 'pipe'
				}
			]);

			assert.deepStrictEqual(Task.execute.getCall(1).args, [
				'buf breaking --against .git#ref=someGitCommitHash --path someFile',
				[],
				{
					shell: true,
					stdio: 'pipe'
				}
			]);
		});

		it('shall run corresponding buf breaking command for the provided file', async function () {
			await buf.breaking({ files: ['someFile'], gitReference: 'someGitCommitHash' });

			assert.deepStrictEqual(Task.execute.getCall(0).args, [
				'buf breaking --against .git#ref=someGitCommitHash --path someFile',
				[],
				{
					shell: true,
					stdio: 'pipe'
				}
			]);
		});

		it('shall reject when a breaking change is found', async function () {
			Task.execute.onFirstCall().resolves({ stdout: 'error1\nerror2', code: '1' });

			await assert.rejects(
				async () =>
					await buf.breaking({
						files: ['someFile'],
						gitReference: 'someGitCommitHash'
					})
			);
		});
	});
});
