'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');
const assert = require('assert');

let getRootDirectory, task;
let buildJob, process;
const workspaceRootDirectory = '/workspace/root/directory';
const jobName = '@sapn/job-provision-cluster';

describe('buildJob', function () {
	before(function () {
		this.timeout(0);
		buildJob = sinon.stub();
		getRootDirectory = sinon.stub().returns(workspaceRootDirectory);
		process = { env: { SOME_ENV: 'true' }, stdout: 'pipe' };
		task = { execute: sinon.stub() };
		buildJob = rewiremock.proxy(() => require('../src/buildJob'), {
			'@sapn/elsa-util-task': task,
			'@sapn/elsa-util-workspace/getRootDirectory': getRootDirectory,
			'node:process': process
		});
	});

	beforeEach(function () {
		task.execute.reset();
		task.execute.resolves({ code: 0, stderr: '' });
	});

	it('shall build the job', async function () {
		await buildJob(jobName);

		sinon.assert.calledOnceWithExactly(task.execute, 'npx nx run-many --targets build --projects @sapn/job-provision-cluster --output-style stream', [], {
			cwd: workspaceRootDirectory,
			shell: true,
			stdio: ['pipe', process.stdout, 'pipe'],
			env: { NODE_ENV: 'production', ...process.env }
		});
	});

	it('shall reject if return code !== 0', async function () {
		task.execute.resolves({ code: 420, stderr: 'Fettleber' });

		await assert.rejects(buildJob(jobName), 'AssertionError [ERR_ASSERTION]: Exception: Building provisioning job @sapn/job-provision-cluster failed: Fettleber');
	});
});
