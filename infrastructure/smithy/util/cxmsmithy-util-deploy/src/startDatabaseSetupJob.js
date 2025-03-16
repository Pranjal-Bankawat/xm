'use strict';

const console = require('node:console');
const buildJob = require('./buildJob');
const runJobInternal = require('./runJobInternal');
const JOB_NAME = '@sapn/job-database-setup';

module.exports = async function startDatabaseSetupJob({ build = true, elsaMetadataDatabaseName }) {
	console.log('Database setup job started');
	if (build) {
		await buildJob(JOB_NAME);
	}

	const cliEnvironment = {};
	if (elsaMetadataDatabaseName) {
		cliEnvironment.ELSA_METADATA_DATABASE_NAME = elsaMetadataDatabaseName;
	}

	await runJobInternal(JOB_NAME, cliEnvironment);
	console.log('Database setup job finished');
};
