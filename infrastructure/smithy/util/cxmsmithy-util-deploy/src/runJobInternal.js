'use strict';

const assert = require('node:assert');
const { resolve } = require('node:path');
const { execute } = require('@sapn/elsa-util-task');
const console = require('node:console');
const process = require('node:process');
const dotenv = require('dotenv');

function getJobWorkspaceDirectory(jobName) {
	return require.resolve(`${jobName}/package.json`).replace('/package.json', '');
}

module.exports = async function runJobInternal(jobName, cliEnvironment = {}) {
	const workspaceDirectory = getJobWorkspaceDirectory(jobName);
	const pathToJobEnvFile = resolve(workspaceDirectory, '.env');

	const jobEnv = { ...process.env };
	dotenv.populate(jobEnv, cliEnvironment, { override: true, debug: process.env.DEBUG });
	dotenv.config({ path: pathToJobEnvFile, processEnv: jobEnv, debug: process.env.DEBUG });

	console.debug(`Running job ${jobName} with environment: ${JSON.stringify(cliEnvironment)}`);

	const { code, stderr } = await execute(`node ${resolve(__dirname, './runJob.js')} ${jobName}`, [], {
		cwd: workspaceDirectory,
		shell: true,
		stdio: 'inherit',
		env: jobEnv
	});
	assert(code === 0, `Exception: Running provisioning job ${jobName} failed: ${stderr}`);
};
