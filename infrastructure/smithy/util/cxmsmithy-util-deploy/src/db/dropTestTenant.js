'use strict';

const dropMetadataDatabase = require('./dropMetadataDatabase');
const dropSchema = require('./dropSchema');
/**
 * drop the test fixtures metadata database and the tenant content schema on localhost
 * @param {string} tenantId - id of the tenant for which the content schema is dropped
 * @param {string} metadataDatabaseName - name of the metadata database which is dropped
 * @return {Promise<void>}
 */
module.exports = async function dropTestTenant(tenantId, metadataDatabaseName) {
	await Promise.all([dropMetadataDatabase(metadataDatabaseName), dropSchema(tenantId)]);
};
