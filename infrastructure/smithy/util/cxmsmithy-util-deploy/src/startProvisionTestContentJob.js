'use strict';

const assert = require('node:assert');
const buildJob = require('./buildJob');
const console = require('node:console');
const runJobInternal = require('./runJobInternal');
const JOB_NAME = '@sapn/job-provision-test-content';

module.exports = async function startProvisionTestContentJob({
	build = true,
	tenantId,
	elsaMetadataDatabaseName,
	disablePublishingOfEvents = true,
	deployDevelopmentTextsOnly = true,
	transientStorage
}) {
	assert(tenantId, 'TenantId is missing for provision test content job cli command');

	console.log('Provision test content job started');

	const cliEnvironment = {
		ELSA_PROVISION_TEST_CONTENT_JOB_TENANT_ID: tenantId,
		ELSA_DISABLE_PUBLISHING_OF_EVENTS: disablePublishingOfEvents.toString(),
		ELSA_DEPLOY_DEV_TEXTS_ONLY: deployDevelopmentTextsOnly.toString(),
		ELSA_ENABLE_WRITING_TO_BUSINESS_OBJECT_DOCUMENT_TABLE: 'true',
		ELSA_IMAGE_METADATA_ENABLED: 'false',
		ELSA_ENABLE_ENTITY_DOCUMENT_READ: 'true',
		ELSA_RUNTIME_DISABLE_BUSINESS_LOGIC: 'true',
		ELSA_RUNTIME_DISABLE_SAVE_IN_ENTITY_API: 'true'
	};
	if (elsaMetadataDatabaseName) {
		cliEnvironment.ELSA_METADATA_DATABASE_NAME = elsaMetadataDatabaseName;
	}
	if (transientStorage) {
		cliEnvironment.TRANSIENT_STORAGE = transientStorage;
	}

	if (build) {
		await buildJob(JOB_NAME);
	}

	await runJobInternal(JOB_NAME, cliEnvironment);

	console.log('Provision test content job finished');
};
