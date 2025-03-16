'use strict';

const { dirname, resolve } = require('node:path');
const { existsSync } = require('node:fs');

module.exports = function getRootDirectory(cwd = process.cwd()) {
	let directory = cwd;
	while (directory !== dirname(directory)) {
		if (existsSync(resolve(directory, 'nx.json'))) {
			return directory;
		} else {
			directory = dirname(directory);
		}
	}
	return undefined;
};
