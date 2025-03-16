'use strict';

const TwoPhaseAsyncTask = require('../src/TwoPhaseAsyncTask');
const assert = require('node:assert');
const childProcess = require('node:child_process');
const { EventEmitter } = require('node:events');
const sinon = require('sinon');

describe('TwoPhaseAsyncTask', function () {
	let args, command, options, task;
	let innerTask;

	beforeEach(function () {
		command = 'command';
		args = ['arg1', 'arg2'];
		options = { cwd: 'cwd', env: {}, uid: 5, gid: 10, stdio: 'pipe', shell: false };
		innerTask = new EventEmitter();
		innerTask.stdout = new EventEmitter();
		innerTask.stderr = new EventEmitter();
		innerTask.kill = sinon.stub();
		task = new TwoPhaseAsyncTask(command, args, options);
		sinon.stub(childProcess, 'spawn');
		childProcess.spawn.withArgs(command, args, options).returns(innerTask);
	});

	afterEach(function () {
		if (childProcess.spawn.restore) {
			childProcess.spawn.restore();
		}
	});

	describe('constructor', function () {
		it('shall throw if stdio set to non-pipe', function () {
			assert.throws(() => {
				options.stdio = 'inherit';
				new TwoPhaseAsyncTask(command, args, options);
			});
		});

		it('shall create TwoPhaseAsyncTask', function () {
			assert.ok(task, 'Failed to create TwoPhaseAsyncTask object');
		});
	});

	describe('#run()', function () {
		it('shall throw if no parameter is passed to', function () {
			assert.throws(
				() => {
					task.run();
				},
				{ message: 'No first phase condition passed!' }
			);
		});

		it('shall return two promises', function () {
			const { startPromise, processPromise } = task.run('Forwarding');
			assert.ok(startPromise instanceof Promise);
			assert.ok(processPromise instanceof Promise);
		});

		it('shall resolve providing code and signal', async function () {
			const { startPromise, processPromise } = task.run('Forwarding');

			innerTask.stdout.emit('data', 'Forwarding');
			await startPromise;
			innerTask.emit('close', 0, 'signal');
			const { code, signal } = await processPromise;
			assert.ok(childProcess.spawn.withArgs(command, args, options).calledOnce);
			assert.strictEqual(code, 0);
			assert.strictEqual(signal, 'signal');
		});

		it('shall resolve providing code, signal, stdout and stderr', async function () {
			const { startPromise, processPromise } = task.run('Forwarding');

			innerTask.stdout.emit('data', 'Forwarding\n');
			await startPromise;

			innerTask.stdout.emit('data', 'std');
			innerTask.stdout.emit('data', 'out');
			innerTask.stderr.emit('data', 'std');
			innerTask.stderr.emit('data', 'err');
			innerTask.emit('close', 0, 'signal');

			const { code, stdout, stderr } = await processPromise;
			assert.ok(childProcess.spawn.withArgs(command, args, options).calledOnce);
			assert.strictEqual(code, 0);
			assert.strictEqual(stdout, 'Forwarding\nstdout');
			assert.strictEqual(stderr, 'stderr');
		});

		it('shall resolve providing code, signal, stdout and stderr if process closes in first phase', async function () {
			const { startPromise } = task.run('Forwarding');

			innerTask.stdout.emit('data', 'std');
			innerTask.stdout.emit('data', 'out');
			innerTask.stderr.emit('data', 'std');
			innerTask.stderr.emit('data', 'err');
			innerTask.emit('close', 0, 'signal');
			const { code, stdout, stderr } = await startPromise;

			assert.ok(childProcess.spawn.withArgs(command, args, options).calledOnce);
			assert.strictEqual(code, 0);
			assert.strictEqual(stdout, 'stdout');
			assert.strictEqual(stderr, 'stderr');
		});

		it('shall reject if error ocurred after first phase', async function () {
			const { startPromise, processPromise } = task.run('Forwarding');

			innerTask.stdout.emit('data', 'Forwarding\n');
			await startPromise;
			innerTask.emit('error', 'InnerTaskError');
			await assert.rejects(async () => await processPromise);
			assert.ok(childProcess.spawn.withArgs(command, args, options).calledOnce);
		});

		it('shall reject if error occurs during first phase', async function () {
			const { startPromise } = task.run('Forwarding');
			innerTask.emit('error', 'InnerTaskError');
			await assert.rejects(async () => await startPromise);
			assert.ok(childProcess.spawn.withArgs(command, args, options).calledOnce);
		});
	});

	describe('kill()', function () {
		beforeEach(function () {
			task.run('Forwarding');
		});

		afterEach(function () {
			if (childProcess.spawn.restore) {
				childProcess.spawn.restore();
			}
		});

		it('shall kill the child process', function () {
			task.kill('SIGNAL');
			sinon.assert.calledOnce(innerTask.kill);
			sinon.assert.calledWith(innerTask.kill, 'SIGNAL');
		});
	});

	describe('restart()', function () {
		beforeEach(function () {
			sinon.spy(task, 'run');
			task.run('Forwarding');
			task.run.resetHistory();
		});

		afterEach(function () {
			if (childProcess.spawn.restore) {
				childProcess.spawn.restore();
			}
		});

		it('shall return a promise', function () {
			assert.ok(task.restart('Forwarding') instanceof Promise);
		});

		it('shall kill the child process and run it again', function () {
			task.restart('Forwarding');
			sinon.assert.calledOnce(innerTask.kill);
			sinon.assert.calledOnce(task.run);
		});
	});

	describe('create()', function () {
		it('shall return the task instance', function () {
			assert.ok(TwoPhaseAsyncTask.create(command) instanceof TwoPhaseAsyncTask);
		});
	});

	describe('execute()', function () {
		beforeEach(function () {
			task = { run: sinon.stub() };
			sinon.stub(TwoPhaseAsyncTask, 'create');
			TwoPhaseAsyncTask.create.withArgs(command).returns(task);
		});

		it('shall create and execute the task', function () {
			TwoPhaseAsyncTask.execute(command);
			assert.ok(TwoPhaseAsyncTask.create.withArgs(command).calledOnce);
			assert.ok(task.run.calledOnce);
		});

		afterEach(function () {
			if (TwoPhaseAsyncTask.create.restore) {
				TwoPhaseAsyncTask.create.restore();
			}
		});
	});
});
