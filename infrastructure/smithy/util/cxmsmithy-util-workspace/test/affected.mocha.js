'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('assert');
const sinon = require('sinon');

let Task, affected;
let args;

describe('affected', function () {
	before(function () {
		this.timeout(0);
		Task = {
			executeSync: sinon.stub()
		};
		rewiremock('@sapn/elsa-util-task').with(Task);
		rewiremock.enable();
		affected = require('../src/affected').affected;
	});

	beforeEach(function () {
		Task.executeSync.resetHistory();

		Task.executeSync.withArgs('npx nx show projects').returns({ stdout: '["affected-package"]', code: 0 });
		args = { baseRef: 'origin/main', headRef: 'HEAD' };
	});

	after(function () {
		rewiremock.disable();
	});

	it('shall print false if package is not affected', function () {
		const returnValue = affected({ npmPackageName: 'not-affected-package', ...args });
		assert.strictEqual(returnValue, false);
		sinon.assert.calledOnce(Task.executeSync);
		sinon.assert.calledWith(Task.executeSync, 'npx nx show projects', ['--affected', '--json', '--base=origin/main', '--head=HEAD', ''], { shell: true, stdio: 'pipe' });
	});

	it('shall print true if package is affected', function () {
		const returnValue = affected({ npmPackageName: 'affected-package', ...args });
		assert.strictEqual(returnValue, true);
		sinon.assert.calledOnce(Task.executeSync);
		sinon.assert.calledWith(Task.executeSync, 'npx nx show projects', ['--affected', '--json', '--base=origin/main', '--head=HEAD', ''], { shell: true, stdio: 'pipe' });
	});

	it('shall pass references and targets to nx show projects', function () {
		affected({ npmPackageName: 'affected-package', targets: ['target1', 'target2'], baseRef: 'someBase', headRef: 'someHead' });
		sinon.assert.calledOnce(Task.executeSync);
		sinon.assert.calledWith(Task.executeSync, 'npx nx show projects', ['--affected', '--json', '--base=someBase', '--head=someHead', '--target=target1,target2'], {
			shell: true,
			stdio: 'pipe'
		});
	});

	it('shall exit when subtask fails', function () {
		Task.executeSync.withArgs('npx nx show projects').returns({ code: 1 });
		assert.throws(() => affected({ npmPackageName: 'affected-package', ...args }));
	});
});
