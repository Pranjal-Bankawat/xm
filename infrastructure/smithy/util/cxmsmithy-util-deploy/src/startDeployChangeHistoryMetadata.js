'use strict';

const console = require('node:console');
const buildJob = require('./buildJob');
const runJobInternal = require('./runJobInternal');
const JOB_NAME = '@sapn/job-change-history-deploy-metadata-local';

module.exports = async function startDeployChangeHistoryMetadata({ build = true, disablePublishingOfEvents = true, deployDevelopmentTextsOnly = true }) {
	console.log('Deploy change history metadata job started');
	if (build) {
		await buildJob(JOB_NAME);
	}
	await runJobInternal(JOB_NAME, {
		ELSA_DISABLE_PUBLISHING_OF_EVENTS: disablePublishingOfEvents.toString(),
		ELSA_IMAGE_METADATA_ENABLED: 'false',
		PUBLISH_ALL_METADATA: 'true',
		ELSA_DEPLOY_DEV_TEXTS_ONLY: deployDevelopmentTextsOnly.toString()
	});

	console.log('Deploy change history metadata job finished');
};
