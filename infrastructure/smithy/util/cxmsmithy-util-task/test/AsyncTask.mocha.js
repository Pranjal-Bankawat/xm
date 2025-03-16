'use strict';

const Task = require('../src/AsyncTask');
const assert = require('node:assert');
const childProcess = require('node:child_process');
const { EventEmitter } = require('node:events');
const sinon = require('sinon');

describe('AsyncTask', function () {
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
			innerTask = new EventEmitter();
			args = ['arg1', 'arg2'];
			options = { cwd: 'cwd', env: {}, uid: 5, gid: 10, stdio: {}, shell: false };
			task = new Task(command, args, options);
			sinon.stub(childProcess, 'spawn');
			childProcess.spawn.withArgs(command, args, options).returns(innerTask);
		});

		afterEach(function () {
			if (childProcess.spawn.restore) {
				childProcess.spawn.restore();
			}
		});

		after(function () {
			Object.defineProperty(process, 'platform', { value: platform });
		});

		it('shall return a Promise', function () {
			assert.ok(task.run() instanceof Promise);
		});

		it('shall resolve providing code and signal', function () {
			setTimeout(() => innerTask.emit('close', 0, 'signal'));

			return task.run().then(({ code, signal }) => {
				assert.ok(childProcess.spawn.withArgs(command, args, options).calledOnce);
				assert.strictEqual(code, 0);
				assert.strictEqual(signal, 'signal');
			});
		});

		it('shall resolve providing code, signal, stdout and stderr if not inherited', function () {
			innerTask.stdout = new EventEmitter();
			innerTask.stderr = new EventEmitter();

			setTimeout(() => {
				innerTask.stdout.emit('data', 'std');
				innerTask.stdout.emit('data', 'out');
				innerTask.stderr.emit('data', 'std');
				innerTask.stderr.emit('data', 'err');
				innerTask.emit('close', 0, 'signal');
			});

			return task.run().then(({ code, stdout, stderr }) => {
				assert.ok(childProcess.spawn.withArgs(command, args, options).calledOnce);
				assert.strictEqual(code, 0);
				assert.strictEqual(stdout, 'stdout');
				assert.strictEqual(stderr, 'stderr');
			});
		});

		it('shall reject if error ocurred', function () {
			setTimeout(() => innerTask.emit('error', 'InnerTaskError'));
			return task
				.run()
				.catch(err => assert.strictEqual(err, 'InnerTaskError'))
				.then(() => assert.ok(childProcess.spawn.withArgs(command, args, options).calledOnce));
		});
	});

	describe('kill()', function () {
		let innerTask;

		beforeEach(function () {
			innerTask = new EventEmitter();
			innerTask.kill = sinon.stub();
			args = ['arg1', 'arg2'];
			options = { cwd: 'cwd', env: {}, uid: 5, gid: 10, stdio: {}, shell: false };
			task = new Task(command, args, options);
			sinon.stub(childProcess, 'spawn');
			childProcess.spawn.withArgs(command, args, options).returns(innerTask);
			task.run();
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
		let innerTask;

		beforeEach(function () {
			innerTask = new EventEmitter();
			innerTask.kill = sinon.stub();
			args = ['arg1', 'arg2'];
			options = { cwd: 'cwd', env: {}, uid: 5, gid: 10, stdio: {}, shell: false };
			task = new Task(command, args, options);
			sinon.spy(task, 'run');
			sinon.stub(childProcess, 'spawn');
			childProcess.spawn.withArgs(command, args, options).returns(innerTask);
			task.run();
			task.run.resetHistory();
		});

		afterEach(function () {
			if (childProcess.spawn.restore) {
				childProcess.spawn.restore();
			}
		});

		it('shall return a promise', function () {
			assert.ok(task.restart() instanceof Promise);
		});

		it('shall kill the child process and run it again', function () {
			task.restart();
			sinon.assert.calledOnce(innerTask.kill);
			sinon.assert.calledOnce(task.run);
		});
	});

	describe('create()', function () {
		it('shall return the task instance', function () {
			assert.ok(Task.create(command) instanceof Task);
		});
	});

	describe('execute()', function () {
		beforeEach(function () {
			task = { run: sinon.stub() };
			sinon.stub(Task, 'create');
			Task.create.withArgs(command).returns(task);
		});

		it('shall create and execute the task', function () {
			Task.execute(command);
			assert.ok(Task.create.withArgs(command).calledOnce);
			assert.ok(task.run.calledOnce);
		});

		afterEach(function () {
			if (Task.create.restore) {
				Task.create.restore();
			}
		});
	});
});
