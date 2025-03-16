'use strict';

const Task = require('@sapn/elsa-util-task');

function isNpmCacheCorrupted() {
	const { code } = Task.executeSync('npm cache verify', [], {
		shell: true,
		stdio: 'pipe'
	});

	return code !== 0;
}

Object.assign(module.exports, {
	isNpmCacheCorrupted
});
