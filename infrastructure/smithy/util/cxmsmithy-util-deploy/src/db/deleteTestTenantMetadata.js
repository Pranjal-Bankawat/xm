'use strict';

const createMongoClient = require('./createMongoClient');
const MetadataDatabaseConstants = require('@sapn/constants/MetadataDatabase');
/**
 * delete the test metadata for the provided tenant and database on localhost
 * @param {string} tenantId - id of the tenant for which the metadata is deleted
 * @param {string} metadataDatabaseName - name of the metadata database
 * @return {Promise<void>}
 */
module.exports = async function deleteTestTenantMetadata(tenantId, metadataDatabaseName) {
	const mongoClient = createMongoClient();
	await mongoClient.connect();
	try {
		const metadataDB = mongoClient.db(metadataDatabaseName);
		const query = { tenantId };
		const metadataCollectionDeleteManyPromises = new Array(MetadataDatabaseConstants.ALL_COLLECTION_NAMES.length);
		for (const collectionName of MetadataDatabaseConstants.ALL_COLLECTION_NAMES) {
			metadataCollectionDeleteManyPromises.push(metadataDB.collection(collectionName).deleteMany(query));
		}
		await Promise.all(metadataCollectionDeleteManyPromises);
	} finally {
		mongoClient.close();
	}
};
