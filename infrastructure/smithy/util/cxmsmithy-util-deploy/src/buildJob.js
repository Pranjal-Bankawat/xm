'use strict';

const assert = require('node:assert');
const process = require('node:process');
const getRootDirectory = require('@sapn/elsa-util-workspace/getRootDirectory');
const { execute } = require('@sapn/elsa-util-task');

const workspaceRootDirectory = getRootDirectory();

module.exports = async function buildProvisioningJobs(jobName) {
	const { code, stderr } = await execute(`npx nx run-many --targets build --projects ${jobName} --output-style stream`, [], {
		cwd: workspaceRootDirectory,
		shell: true,
		stdio: ['pipe', process.stdout, 'pipe'],
		env: {
			NODE_ENV: 'production',
			...process.env
		}
	});

	assert(code === 0, `Exception: Building provisioning job ${jobName} failed: ${stderr}`);
};
