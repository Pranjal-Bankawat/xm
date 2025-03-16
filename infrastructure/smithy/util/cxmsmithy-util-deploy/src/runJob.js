'use strict';

(async function main() {
	const process = require('node:process');
	const [, , jobName] = process.argv;
	const Job = require(`${jobName}/bundle`);
	const job = await Job.create();
	await job.run();
})();
