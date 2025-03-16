'use strict';

const Task = require('@sapn/elsa-util-task');

function getCurrentNpmVersion() {
	const { stdout, code, stderr } = Task.executeSync('npm -v', [], {
		shell: true,
		stdio: 'pipe'
	});

	if (code === 0) {
		return stdout;
	} else {
		throw new Error(stderr);
	}
}

function getLatestNpmVersion() {
	const { stdout, code, stderr } = Task.executeSync('npm view npm version', [], {
		shell: true,
		stdio: 'pipe'
	});

	if (code === 0) {
		return stdout;
	} else {
		throw new Error(stderr);
	}
}

Object.assign(module.exports, {
	getCurrentNpmVersion,
	getLatestNpmVersion
});
