'use strict';

const getWorkspaces = require('@sapn/elsa-util-workspace/get');
const console = require('node:console');
const process = require('node:process');
const { resolve } = require('node:path');
const { existsSync } = require('node:fs');
const { mkdir } = require('node:fs/promises');

module.exports = async function setup() {
	process.on('unhandledRejection', async reason => {
		console.error(`Unhandled Rejection due to "${reason}". Stack: ${reason.stack}`);
		process.exit(1);
	});

	const [workspace] = Object.values(getWorkspaces([process.cwd()], { dependencies: false, metadata: false }));

	const distDirectory = resolve(workspace.location, 'dist');

	if (!existsSync(distDirectory)) {
		await mkdir(distDirectory);
	}

	return workspace;
};
