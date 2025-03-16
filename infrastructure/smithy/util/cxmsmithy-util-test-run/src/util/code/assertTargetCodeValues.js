'use strict';

const assert = require('assert');
const { unitOfMeasureRootTableName, distributionChannelRootTableName, unitOfMeasureDescriptionTableName, distributionChannelDescriptionTableName } = require('./Constants');
const readNormalizedCodeDataByTenant = require('./readNormalizedCodeDataByTenant');

module.exports = async function assertTargetCodeValues(requestScope, sourceTenantId, targetTenantId) {
	const normalizedUnitOfMeasureSourceData = await readNormalizedCodeDataByTenant(requestScope, sourceTenantId, unitOfMeasureRootTableName, unitOfMeasureDescriptionTableName);
	const normalizedUnitOfMeasureTargetData = await readNormalizedCodeDataByTenant(requestScope, targetTenantId, unitOfMeasureRootTableName, unitOfMeasureDescriptionTableName);
	assert.deepStrictEqual(normalizedUnitOfMeasureSourceData, normalizedUnitOfMeasureTargetData);
	assert.strictEqual(normalizedUnitOfMeasureTargetData.length, 2);

	const normalizedDistributionChannelSourceData = await readNormalizedCodeDataByTenant(
		requestScope,
		sourceTenantId,
		distributionChannelRootTableName,
		distributionChannelDescriptionTableName
	);
	const normalizedDistributionChannelTargetData = await readNormalizedCodeDataByTenant(
		requestScope,
		targetTenantId,
		distributionChannelRootTableName,
		distributionChannelDescriptionTableName
	);
	assert.deepStrictEqual(normalizedDistributionChannelSourceData, normalizedDistributionChannelTargetData);
	assert.strictEqual(normalizedDistributionChannelTargetData.length, 1);
};
