'use strict';

const AsyncTask = require('./AsyncTask');
const childProcess = require('child_process');
const assert = require('node:assert');

module.exports = class TwoPhaseAsyncTask extends AsyncTask {
	constructor(command, args, { stdio = 'pipe' } = {}) {
		super(...arguments);
		if (stdio !== 'pipe') {
			throw new Error('Only "pipe" for options.stdio supported!');
		}
	}

	run(expectedFirstPhaseOutput) {
		assert(expectedFirstPhaseOutput, 'No first phase condition passed!');
		this.task = childProcess.spawn(this.command, this.args, this.options);
		let stderr = '',
			stdout = '';
		let inFirstPhase = true;
		const firstPhaseFunctions = new ProcessFunctionMap();
		const secondPhaseFunctions = new ProcessFunctionMap();

		const processPromise = new Promise((resolve, reject) => {
			secondPhaseFunctions.close = (code, signal) => {
				resolve({ code, signal, stdout, stderr });
			};
			secondPhaseFunctions.error = err => {
				reject(err, stdout, stderr);
			};
			secondPhaseFunctions.stdout.data = data => {
				stdout += data;
			};
			secondPhaseFunctions.stderr.data = data => {
				stderr += data;
			};
		});
		const startPromise = new Promise((resolve, reject) => {
			firstPhaseFunctions.stdout.data = data => {
				const outputLine = data.toString();
				if (outputLine.includes(expectedFirstPhaseOutput)) {
					inFirstPhase = false;
					resolve();
				}
				stdout += data;
			};
			firstPhaseFunctions.stderr.data = data => {
				stderr += data;
			};
			firstPhaseFunctions.close = (code, signal) => {
				resolve({ code, signal, stdout, stderr });
			};
			firstPhaseFunctions.error = err => {
				reject(err, stdout, stderr);
			};
		});

		this.task.stdout.on('data', data => {
			const functionMap = inFirstPhase ? firstPhaseFunctions : secondPhaseFunctions;
			functionMap.stdout.data(data);
		});
		this.task.stderr.on('data', data => {
			const functionMap = inFirstPhase ? firstPhaseFunctions : secondPhaseFunctions;
			functionMap.stderr.data(data);
		});
		this.task.on('close', (code, signal) => {
			const functionMap = inFirstPhase ? firstPhaseFunctions : secondPhaseFunctions;
			functionMap.close(code, signal);
		});
		this.task.on('error', err => {
			const functionMap = inFirstPhase ? firstPhaseFunctions : secondPhaseFunctions;
			functionMap.error(err);
		});
		return { startPromise, processPromise };
	}

	async restart(expectedFirstPhaseOutput) {
		this.kill();
		return this.run(expectedFirstPhaseOutput);
	}
};

class ProcessFunctionMap {
	stdout = {
		data: {}
	};
	stderr = {
		data: {}
	};
	close = {};
	error = {};
}
