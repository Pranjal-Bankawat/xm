'use strict';

const rewiremock = require('rewiremock/node');
const sinon = require('sinon');
const { dirname, resolve } = require('node:path');

let runJobInternal, process, dotenv, task, getWorkspaces;
const jobName = '@sapn/job-provision-cluster';
const workspaceLocation = dirname(require.resolve(`${jobName}/package.json`));
const pathToEnvFile = resolve(workspaceLocation, '.env');

describe('runJobInternal', function () {
	before(function () {
		this.timeout(0);
		dotenv = {
			populate: sinon.stub(),
			config: sinon.stub()
		};
		process = {
			env: {
				SOME_ENV: 'true',
				DEBUG: 'dotenv'
			}
		};
		task = {
			execute: sinon.stub()
		};
		getWorkspaces = sinon.stub();
		runJobInternal = rewiremock.proxy(() => require('../src/runJobInternal'), {
			'@sapn/elsa-util-task': task,
			'node:process': process,
			dotenv
		});
	});

	beforeEach(function () {
		getWorkspaces.reset();
		getWorkspaces.resolves({
			[jobName]: {
				location: workspaceLocation
			}
		});
		task.execute.reset();
		task.execute.resolves({ code: 0, stderr: '' });
		dotenv.populate.resetHistory();
		dotenv.config.resetHistory();
	});

	it('shall resolve the .env path of the job and pass it to the dotenv config', async function () {
		await runJobInternal(jobName, { SOME_CLI_ENV: true });

		sinon.assert.calledOnceWithExactly(dotenv.populate, { ...process.env }, { SOME_CLI_ENV: true }, { override: true, debug: 'dotenv' });
		sinon.assert.calledOnceWithExactly(dotenv.config, {
			path: pathToEnvFile,
			processEnv: { ...process.env },
			debug: 'dotenv'
		});
	});

	it('shall run the job', async function () {
		await runJobInternal(jobName, { SOME_CLI_ENV: true });

		sinon.assert.calledOnceWithExactly(task.execute, `node ${require.resolve('../src/runJob.js')} ${jobName}`, [], {
			cwd: workspaceLocation,
			shell: true,
			stdio: 'inherit',
			env: { SOME_ENV: 'true', DEBUG: 'dotenv' }
		});
	});
});
