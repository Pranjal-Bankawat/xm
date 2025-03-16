'use strict';

const getRootDirectory = require('./getRootDirectory');
const { resolve } = require('node:path');
const { readFileSync } = require('node:fs');

module.exports = function getRoot(cwd = process.cwd()) {
	const workspaceRootDirectory = getRootDirectory(cwd);
	const { name, version } = JSON.parse(readFileSync(resolve(workspaceRootDirectory, 'package.json'), { encoding: 'utf8' }));
	return {
		name,
		version,
		location: workspaceRootDirectory
	};
};
