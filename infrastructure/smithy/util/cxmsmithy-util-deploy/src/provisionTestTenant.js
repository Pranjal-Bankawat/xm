'use strict';

const startProvisionTenantJob = require('./startProvisionTenantJob');
const startProvisionTestContentJob = require('./startProvisionTestContentJob');

module.exports = async function provisionTestTenant(tenantId, options = {}, transientStorage = 'None') {
	const build = false;
	const deployDevelopmentTextsOnly = false;
	const disablePublishingOfEvents = options.disablePublishingOfEvents ?? true;
	await startProvisionTenantJob({ build, tenantId, deployDevelopmentTextsOnly, transientStorage, disablePublishingOfEvents });
	await startProvisionTestContentJob({ build, tenantId, deployDevelopmentTextsOnly, transientStorage, disablePublishingOfEvents });
};
