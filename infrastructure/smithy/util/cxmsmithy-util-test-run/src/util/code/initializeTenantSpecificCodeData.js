'use strict';

const assert = require('assert');
const { unitOfMeasureRootTableName, distributionChannelRootTableName, unitOfMeasureDescriptionTableName, distributionChannelDescriptionTableName } = require('./Constants');
const createTenantSpecificUnitOfMeasureData = require('./createTenantSpecificUnitOfMeasureData');
const createTenantSpecificDistributionChannelData = require('./createTenantSpecificDistributionChannelData');
const readNormalizedCodeDataByTenant = require('./readNormalizedCodeDataByTenant');

module.exports = async function initializeTenantSpecificCodeData(requestScope, tenantId) {
	await createTenantSpecificUnitOfMeasureData(requestScope, tenantId);
	await createTenantSpecificDistributionChannelData(requestScope, tenantId);

	const normalizedUnitOfMeasureSourceData = await readNormalizedCodeDataByTenant(requestScope, tenantId, unitOfMeasureRootTableName, unitOfMeasureDescriptionTableName, '5B');
	const normalizedDistributionChannelSourceData = await readNormalizedCodeDataByTenant(
		requestScope,
		tenantId,
		distributionChannelRootTableName,
		distributionChannelDescriptionTableName,
		'Z2'
	);
	assert.strictEqual(normalizedUnitOfMeasureSourceData.code, '5B');
	assert.strictEqual(normalizedDistributionChannelSourceData.code, 'Z2');
};
