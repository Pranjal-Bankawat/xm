'use strict';

const AbstractTask = require('./AbstractTask');
const childProcess = require('child_process');

module.exports = class AsyncTask extends AbstractTask {
	task;

	async run() {
		return await new Promise((resolve, reject) => {
			this.task = childProcess.spawn(this.command, this.args, this.options);

			let stderr = '',
				stdout = '';

			if (this.task.stdout) {
				this.task.stdout.on('data', data => {
					stdout += data;
				});
			}
			if (this.task.stderr) {
				this.task.stderr.on('data', data => {
					stderr += data;
				});
			}

			this.task.on('close', async (code, signal) => {
				resolve({ code, signal, stdout, stderr });
			});
			this.task.on('error', err => reject(err, stdout, stderr));
		});
	}

	kill(signal) {
		this.task.kill(signal);
		this.task = undefined;
	}

	async restart() {
		this.kill();
		return this.run();
	}

	static async execute() {
		return super.execute(...arguments);
	}
};
