'use strict';

const console = require('node:console');
const buildJob = require('./buildJob');
const runJobInternal = require('./runJobInternal');
const JOB_NAME = '@sapn/job-provision-cluster';

module.exports = async function startProvisionClusterJob({ build = true, elsaMetadataDatabaseName, disablePublishingOfEvents = true, deployDevelopmentTextsOnly = true }) {
	console.log('Provision cluster job started');
	if (build) {
		await buildJob(JOB_NAME);
	}

	const cliEnvironment = {
		ELSA_DISABLE_PUBLISHING_OF_EVENTS: disablePublishingOfEvents.toString(),
		PUBLISH_ALL_METADATA: 'true',
		ELSA_IMAGE_METADATA_ENABLED: 'false',
		ELSA_DEPLOY_DEV_TEXTS_ONLY: deployDevelopmentTextsOnly.toString()
	};
	if (elsaMetadataDatabaseName) {
		cliEnvironment.ELSA_METADATA_DATABASE_NAME = elsaMetadataDatabaseName;
	}

	await runJobInternal(JOB_NAME, cliEnvironment);
	console.log('Provision cluster job finished');
};
