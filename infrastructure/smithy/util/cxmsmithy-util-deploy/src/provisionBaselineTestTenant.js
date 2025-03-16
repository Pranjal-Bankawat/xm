'use strict';

const process = require('node:process');
const startDatabaseSetupJob = require('./startDatabaseSetupJob');
const startProvisionClusterJob = require('./startProvisionClusterJob');
const startProvisionTenantJob = require('./startProvisionTenantJob');
const startProvisionTestContentJob = require('./startProvisionTestContentJob');

module.exports = async function provisionBaselineTestTenant(tenantId) {
	const build = process.env.MOCHA_SETUP === 'LOCAL';
	const deployDevelopmentTextsOnly = process.env.ELSA_DEPLOY_ALL_TEXTS !== 'true';
	const elsaMetadataDatabaseName = tenantId;
	await startDatabaseSetupJob({ build, elsaMetadataDatabaseName });
	await startProvisionClusterJob({ build, tenantId, elsaMetadataDatabaseName, deployDevelopmentTextsOnly: true });
	await startProvisionTenantJob({ build, tenantId, elsaMetadataDatabaseName, deployDevelopmentTextsOnly, transientStorage: 'redis' });
	await startProvisionTestContentJob({ build, tenantId, elsaMetadataDatabaseName, deployDevelopmentTextsOnly });
};
