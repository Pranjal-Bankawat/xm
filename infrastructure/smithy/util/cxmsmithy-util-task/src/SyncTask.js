'use strict';

const AbstractTask = require('./AbstractTask');
const childProcess = require('child_process');

module.exports = class SyncTask extends AbstractTask {
	run() {
		const { status: code, signal, stderr, stdout } = childProcess.spawnSync(this.command, this.args, this.options);
		return { code, signal, stderr: stderr ? stderr.toString().trim() : stderr, stdout: stdout ? stdout.toString().trim() : stdout };
	}
};
