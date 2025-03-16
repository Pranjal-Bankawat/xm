'use strict';

const createMongoClient = require('./createMongoClient');
const nodeConsole = require('node:console');
/**
 * drop the metadata database on localhost
 * @param {string} metadataDatabaseName - name of the metadata database which is dropped
 * @return {Promise<void>}
 */
module.exports = async function dropMetadataDatabase(metadataDatabaseName) {
	const mongoClient = createMongoClient();
	try {
		await mongoClient.connect();
		const metadataDB = mongoClient.db(metadataDatabaseName);
		await metadataDB.dropDatabase();
	} catch (error) {
		nodeConsole.error(`Failed to drop database ${metadataDatabaseName} due to ${error.toString()}`);
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
