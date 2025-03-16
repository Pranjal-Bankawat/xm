'use strict';

const uuid = require('@sapn/uuid');
const { distributionChannelRootTableName, distributionChannelDescriptionTableName } = require('./Constants');
const createDistributionChannelRootData = require('./createDistributionChannelRootData');
const transformDataToDBFormat = require('./transformDataToDBFormat');
const createCodeDescriptionData = require('./createCodeDescriptionData');
const insertTenantSpecificCodeData = require('./insertTenantSpecificCodeData');

module.exports = async function createTenantSpecificDistributionChannelData(
	sourceRequestScope,
	tenantId,
	code = 'Z2',
	englishDescription = 'my english dc text',
	germanDescription = 'mein deutscher dc text'
) {
	const rootId = uuid.create();
	const sourceRootData = createDistributionChannelRootData(rootId, rootId, code, tenantId, false);
	const rootSourceDBData = transformDataToDBFormat(sourceRootData);
	const englishDescriptionSourceData = createCodeDescriptionData(uuid.create(), rootId, rootId, englishDescription, 'en', tenantId, false);
	const englishDescriptionSourceDBData = transformDataToDBFormat(englishDescriptionSourceData);
	const germanDescriptionSourceData = createCodeDescriptionData(uuid.create(), rootId, rootId, germanDescription, 'de', tenantId, false);
	const germanDescriptionSourceDBData = transformDataToDBFormat(germanDescriptionSourceData);
	const distributionChannelDescriptionSourceDBData = [englishDescriptionSourceDBData, germanDescriptionSourceDBData];

	await insertTenantSpecificCodeData(
		sourceRequestScope,
		[rootSourceDBData],
		distributionChannelDescriptionSourceDBData,
		distributionChannelRootTableName,
		distributionChannelDescriptionTableName
	);
};
