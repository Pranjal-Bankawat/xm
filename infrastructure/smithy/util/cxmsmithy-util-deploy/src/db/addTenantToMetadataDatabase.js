'use strict';

const createMongoClient = require('./createMongoClient');
const nodeConsole = require('node:console');
const MetadataDatabaseConstants = require('@sapn/constants/MetadataDatabase');
/**
 * add tenant to the metadata database on localhost
 * @param {string} metadataDatabaseName - name of the metadata database which is dropped
 * @param {string} tenantId - id of the tenant to be added
 * @return {Promise<void>}
 */
module.exports = async function addTenantToMetadataDatabase(tenantId, metadataDatabaseName) {
	const mongoClient = createMongoClient();
	try {
		await mongoClient.connect();
		const metadataDB = mongoClient.db(metadataDatabaseName);
		const tenantCollection = metadataDB.collection(MetadataDatabaseConstants.TENANT_COLLECTION_NAME);
		await tenantCollection.deleteOne({ tenantId });
		await tenantCollection.insertOne({ tenantId, tenantMetadata: createTenantMetadata(tenantId) });
	} catch (error) {
		nodeConsole.error(`Failed to add tenant ${tenantId} to database ${metadataDatabaseName} due to ${error.toString()}`);
	} finally {
		await closeMongoClient(metadataDatabaseName, mongoClient);
	}
};
async function closeMongoClient(metadataDatabaseName, mongoClient) {
	try {
		await mongoClient.close();
	} catch (error) {
		nodeConsole.error(`Failed to close connection to database ${metadataDatabaseName} due to ${error.toString()}`);
	}
}

function createTenantMetadata(tenantId) {
	return {
		id: tenantId,
		accountId: '',
		adminData: null,
		tenantTypeCode: 'DEV',
		customerId: '',
		customerName: '',
		tenantUrl: '',
		dataCenter: '',
		tenantProvisioningType: 'CNS_C4C_SIDE_BY_SIDE',
		tenantStatusCode: 'LIVE',
		tenantApplications: [],
		skus: [],
		features: []
	};
}
