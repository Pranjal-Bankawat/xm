'use strict';

const dropTestTenant = require('./dropTestTenant');
const dropSchema = require('./dropSchema');
const BaselineTestTenantId = 'BaselineTestTenant';
const BaselineCodesTestTenantId = 'BaselineCodes';

/**
 * drop the baseline tenant test fixtures (metadata and content) on localhost
 * @return {Promise<void>}
 */
module.exports = async function dropBaselineTestTenant() {
	await dropTestTenant(BaselineTestTenantId, BaselineTestTenantId);
	await dropSchema(BaselineCodesTestTenantId);
};
