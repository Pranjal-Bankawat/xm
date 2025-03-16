'use strict';

const Task = require('../src/SyncTask');
const assert = require('node:assert');
const childProcess = require('node:child_process');
const sinon = require('sinon');

describe('SyncTask', function () {
	let args, command, options, platform, task;

	beforeEach(function () {
		command = 'command';
	});

	describe('#run()', function () {
		let innerTask;

		before(function () {
			platform = process.platform;
			Object.defineProperty(process, 'platform', { value: 'darwin' });
		});

		beforeEach(function () {
			innerTask = {
				status: 0,
				signal: 'signal',
				stdout: Buffer.from('stdout'),
				stderr: Buffer.from('stderr')
			};
			args = ['arg1', 'arg2'];
			options = { cwd: 'cwd', env: {}, uid: 5, gid: 10, stdio: {}, shell: false };
			task = new Task(command, args, options);
			sinon.stub(childProcess, 'spawnSync');
			childProcess.spawnSync.withArgs(command, args, options).returns(innerTask);
		});

		afterEach(function () {
			if (childProcess.spawnSync.restore) {
				childProcess.spawnSync.restore();
			}
		});

		after(function () {
			Object.defineProperty(process, 'platform', { value: platform });
		});

		it('shall always return code, signal', function () {
			delete innerTask.stdout;
			delete innerTask.stderr;
			const { code, signal, stdout, stderr } = task.run();
			assert.ok(childProcess.spawnSync.withArgs(command, args, options).calledOnce);
			assert.strictEqual(code, 0);
			assert.strictEqual(signal, 'signal');
			assert.strictEqual(stdout, undefined);
			assert.strictEqual(stderr, undefined);
		});

		it('shall return code, signal, stdout, stderr', function () {
			const { code, signal, stdout, stderr } = task.run();
			assert.ok(childProcess.spawnSync.withArgs(command, args, options).calledOnce);
			assert.strictEqual(code, 0);
			assert.strictEqual(signal, 'signal');
			assert.strictEqual(stdout, 'stdout');
			assert.strictEqual(stderr, 'stderr');
		});
	});
});
