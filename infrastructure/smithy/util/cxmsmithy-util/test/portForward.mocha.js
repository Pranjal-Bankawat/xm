'use strict';
const sinon = require('sinon');
const rewiremock = require('rewiremock/node');
const assert = require('node:assert');

describe('portForward', function () {
	let TwoPhaseAsyncTaskMock, twoPhaseAsyncTaskInstanceMock, taskRunPromiseMock, taskStartPromiseMock;
	let portForward;

	before(function () {
		this.timeout(0);
		taskRunPromiseMock = Promise.resolve();
		taskStartPromiseMock = Promise.resolve();
		twoPhaseAsyncTaskInstanceMock = {
			run: sinon.stub().returns({ processPromise: taskRunPromiseMock, startPromise: taskStartPromiseMock })
		};
		TwoPhaseAsyncTaskMock = sinon.stub().returns(twoPhaseAsyncTaskInstanceMock);

		portForward = rewiremock.proxy(() => require('../src/portForward'), {
			'@sapn/elsa-util-task/TwoPhaseAsync': TwoPhaseAsyncTaskMock
		});
	});

	beforeEach(function () {
		twoPhaseAsyncTaskInstanceMock.run.resetHistory();
		TwoPhaseAsyncTaskMock.resetHistory();
	});

	it('shall create, run task, and return task and run promise', function () {
		const { kubectlTask, startPromise, processPromise } = portForward.forwardServicePort('my-service', 8080, 4000, 'myNamespace');

		assert(kubectlTask, 'No task was returned!');
		assert(startPromise, 'No start promise was returned!');
		assert(processPromise, 'No process promise was returned!');

		assert.strictEqual(startPromise, taskStartPromiseMock);
		assert.strictEqual(processPromise, taskRunPromiseMock);
	});

	it('shall pass correct parameters to kubectl', function () {
		portForward.forwardServicePort('my-service', 8080, 4000, 'myNamespace');

		sinon.assert.calledWith(TwoPhaseAsyncTaskMock, 'kubectl', ['port-forward', '--namespace', 'myNamespace', 'svc/my-service', '4000:8080'], { stdio: 'pipe' });
		sinon.assert.calledWith(twoPhaseAsyncTaskInstanceMock.run, 'Forwarding');
	});
});
