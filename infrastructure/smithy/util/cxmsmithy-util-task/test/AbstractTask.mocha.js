'use strict';

const Task = require('../src/AbstractTask');
const assert = require('node:assert');
const sinon = require('sinon');
const nodeProcess = require('node:process');

describe('AbstractTask', function () {
	let args, command, platform, task;

	beforeEach(function () {
		command = 'command';
	});

	describe('#constructor()', function () {
		it('shall throw exception if command is not provided', function () {
			assert.throws(() => new Task());
			assert.throws(() => new Task(undefined));
		});

		it('shall throw exception if type of command is not string', function () {
			assert.throws(() => new Task(true));
		});

		it('shall throw exception if type of args is not array of strings', function () {
			assert.throws(() => new Task('command', true));
		});

		it('shall throw exception if type of options.cwd is not string', function () {
			assert.throws(() => new Task('command', [], { cwd: true }));
		});

		it('shall throw exception if type of options.env is not string', function () {
			assert.throws(() => new Task('command', [], { env: true }));
		});

		it('shall throw exception if type of options.uid is not number', function () {
			assert.throws(() => new Task('command', [], { uid: true }));
		});

		it('shall throw exception if type of options.gid is not number', function () {
			assert.throws(() => new Task('command', [], { gid: true }));
		});

		it('shall throw exception if type of options.stdio is not string or object', function () {
			assert.throws(() => new Task('command', [], { stdio: true }));
		});

		it('shall throw exception if type of options.shell is not boolean', function () {
			assert.throws(() => new Task('command', [], { shell: 5 }), /Invalid Argument Type: options.shell must be boolean/);
		});

		describe('#constructor(windows)', function () {
			before(function () {
				platform = nodeProcess.platform;
				Object.defineProperty(nodeProcess, 'platform', { value: 'win32' });
			});

			beforeEach(function () {
				task = new Task(command);
			});

			it('shall default uid to undefined', function () {
				assert.strictEqual(task.options.uid, undefined);
			});

			it('shall default gid to undefined', function () {
				assert.strictEqual(task.options.gid, undefined);
			});

			after(function () {
				Object.defineProperty(nodeProcess, 'platform', { value: platform });
			});
		});

		describe('#constructor(non-windows)', function () {
			before(function () {
				platform = nodeProcess.platform;
				Object.defineProperty(nodeProcess, 'platform', { value: 'darwin' });
			});

			beforeEach(function () {
				if (platform === 'win32') {
					nodeProcess.getuid = sinon.stub();
					nodeProcess.getgid = sinon.stub();
				} else {
					sinon.stub(nodeProcess, 'getuid');
					sinon.stub(nodeProcess, 'getgid');
				}
				nodeProcess.getuid.returns(1);
				nodeProcess.getgid.returns(2);
				task = new Task(command);
			});

			it('shall default uid to undefined', function () {
				assert.strictEqual(task.options.uid, 1);
			});

			it('shall default gid to undefined', function () {
				assert.strictEqual(task.options.gid, 2);
			});

			afterEach(function () {
				if (nodeProcess.getuid.restore) {
					nodeProcess.getuid.restore();
				}
				if (nodeProcess.getgid.restore) {
					nodeProcess.getgid.restore();
				}
			});

			after(function () {
				Object.defineProperty(process, 'platform', { value: platform });
			});
		});
	});

	describe('#command', function () {
		beforeEach(function () {
			task = new Task(command);
		});

		it('shall throw exception if task is tried to be changed', function () {
			assert.throws(() => (task.command = 'read-only'));
		});

		describe('#command[non-windows]', function () {
			before(function () {
				platform = nodeProcess.platform;
				Object.defineProperty(nodeProcess, 'platform', { value: 'darwin' });
			});

			beforeEach(function () {
				if (platform === 'win32') {
					nodeProcess.getuid = sinon.stub();
					nodeProcess.getgid = sinon.stub();
				} else {
					sinon.stub(nodeProcess, 'getuid');
					sinon.stub(nodeProcess, 'getgid');
				}
				nodeProcess.getuid.returns(1);
				nodeProcess.getgid.returns(2);
				task = new Task(command);
			});

			it('shall return the task command', function () {
				assert.strictEqual(task.command, command);
			});

			afterEach(function () {
				if (nodeProcess.getuid.restore) {
					nodeProcess.getuid.restore();
				}
				if (nodeProcess.getgid.restore) {
					nodeProcess.getgid.restore();
				}
			});

			after(function () {
				Object.defineProperty(nodeProcess, 'platform', { value: platform });
			});
		});

		describe('#command[windows]', function () {
			before(function () {
				platform = nodeProcess.platform;
				Object.defineProperty(nodeProcess, 'platform', { value: 'win32' });
			});

			it('shall return the task command', function () {
				assert.strictEqual(task.command, process.env.comspec);
			});

			after(function () {
				Object.defineProperty(nodeProcess, 'platform', { value: platform });
			});
		});
	});

	describe('#args', function () {
		beforeEach(function () {
			args = ['arg1', 'arg2'];
			task = new Task(command, args);
		});

		it('shall throw exception if args is tried to be changed', function () {
			assert.throws(() => (task.args = 'read-only'));
		});

		describe('#command[non-windows]', function () {
			before(function () {
				platform = nodeProcess.platform;
				Object.defineProperty(nodeProcess, 'platform', { value: 'darwin' });
			});

			beforeEach(function () {
				if (platform === 'win32') {
					nodeProcess.getuid = sinon.stub();
					nodeProcess.getgid = sinon.stub();
				} else {
					sinon.stub(nodeProcess, 'getuid');
					sinon.stub(nodeProcess, 'getgid');
				}
				nodeProcess.getuid.returns(1);
				nodeProcess.getgid.returns(2);
				task = new Task(command, args);
			});

			it('shall return the task args', function () {
				assert.strictEqual(task.args, args);
			});

			afterEach(function () {
				if (nodeProcess.getuid.restore) {
					nodeProcess.getuid.restore();
				}
				if (nodeProcess.getgid.restore) {
					nodeProcess.getgid.restore();
				}
			});

			after(function () {
				Object.defineProperty(nodeProcess, 'platform', { value: platform });
			});
		});

		describe('#command[windows]', function () {
			before(function () {
				platform = nodeProcess.platform;
				Object.defineProperty(nodeProcess, 'platform', { value: 'win32' });
			});

			it('shall return the task args', function () {
				assert.deepEqual(task.args, ['/c', command].concat(args));
			});

			after(function () {
				Object.defineProperty(nodeProcess, 'platform', { value: platform });
			});
		});
	});

	describe('#run()', function () {
		beforeEach(function () {
			task = new Task(command);
		});

		it('shall throw exception if abstract method is invoked', function () {
			assert.throws(() => task.run(), /Runtime Exception: Invoking Abstract Method/);
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
