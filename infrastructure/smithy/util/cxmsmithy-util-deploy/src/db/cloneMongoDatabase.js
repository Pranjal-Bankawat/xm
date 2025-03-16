'use strict';

const console = require('node:console');
const createMongoClient = require('./createMongoClient');

module.exports = async function cloneMongoDatabase(sourceDatabaseName, targetDatabaseName) {
	console.log(`Cloning metadata database from ${sourceDatabaseName} to ${targetDatabaseName}`);
	const mongoClient = createMongoClient();
	try {
		const sourceDb = mongoClient.db(sourceDatabaseName);
		const targetDb = mongoClient.db(targetDatabaseName);
		const collections = await sourceDb.listCollections().toArray();
		const existingCollectionNames = collections.map(collection => collection.name);
		await Promise.allSettled(
			existingCollectionNames.map(async collectionName => {
				const collection = sourceDb.collection(collectionName);
				const indexes = await collection.indexes();
				const filteredIndexes = indexes?.filter(({ name }) => name !== '_id_').map(({ key }) => ({ key }));
				const cursor = await collection.find({});
				const data = await cursor.toArray();

				await targetDb.collection(collectionName).insertMany(data);
				if (filteredIndexes?.length) {
					await targetDb.collection(collectionName).createIndexes(filteredIndexes);
				}
			})
		);
	} catch (err) {
		console.error(err);
		throw err;
	} finally {
		await mongoClient.close();
	}
};
