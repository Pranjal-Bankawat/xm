'use strict';

const rewiremock = require('rewiremock').default;
const sinon = require('sinon');
const { resolve } = require('path');

describe('setup', function () {
	let console, fs, getWorkspaces, process, workspace;

	let setupStart, distDirectory;

	before(function () {
		this.timeout(0);

		workspace = { name: '@sapn/workspace', location: '/path/to/workspace/folder' };
		distDirectory = resolve(workspace.location, 'dist');

		console = {
			error: sinon.stub()
		};

		fs = {
			existsSync: sinon.stub(),
			promises: {
				mkdir: sinon.stub()
			}
		};

		getWorkspaces = sinon.stub();

		process = {
			cwd: sinon.stub().returns(workspace.location),
			on: sinon.stub(),
			exit: sinon.stub()
		};

		setupStart = rewiremock.proxy(
			() => require('../src/setup'),
			r => ({
				'node:console': console,
				'@sapn/elsa-util-workspace/get': getWorkspaces,
				'node:process': r.callThrough().with(process),
				'node:fs': r.callThrough().with(fs),
				'node:fs/promises': r.callThrough().with(fs.promises)
			})
		);
	});

	beforeEach(function () {
		process.exit.reset();
		process.on.reset();
		fs.promises.mkdir.reset();
		fs.promises.mkdir.withArgs(distDirectory).resolves();
		fs.existsSync.withArgs(distDirectory).returns(false);

		getWorkspaces.reset();
		getWorkspaces.returns({
			[workspace.name]: workspace
		});
	});

	after(function () {
		rewiremock.disable();
	});

	it('shall register for unhandled promise rejections', async function () {
		await setupStart();
		sinon.assert.calledOnce(process.on);
		sinon.assert.calledWith(process.on, 'unhandledRejection', sinon.match.func);
	});

	async function emitUnhandledRejection() {
		const reason = { toString: sinon.stub().returns('badDay'), stack: 'nice_callstack' };
		const promise = 'oops_i_rejected';

		process.on.callArgWith(1, reason, promise);
	}

	it('shall exit with code 1 if unhandled promise rejection is emitted', async function () {
		await setupStart();
		await emitUnhandledRejection();

		// mocha also registers for this event and delelgates to the registered listeners
		// hence those stubs will always be called twice
		sinon.assert.calledWith(process.exit, 1);
		sinon.assert.calledWith(console.error, 'Unhandled Rejection due to "badDay". Stack: nice_callstack');
	});

	it('shall terminate the log before calling process.exit', async function () {
		await setupStart();
		await emitUnhandledRejection();
		sinon.assert.called(process.exit);
	});

	it('shall start the service and create dist dir if not existing', async function () {
		await setupStart();
		sinon.assert.calledOnce(fs.promises.mkdir);
		sinon.assert.calledWith(fs.promises.mkdir, distDirectory);
	});

	it('shall start the service and not create dist dir if existing', async function () {
		fs.existsSync.withArgs(distDirectory).returns(true);

		await setupStart();
		sinon.assert.notCalled(fs.promises.mkdir);
	});
});
