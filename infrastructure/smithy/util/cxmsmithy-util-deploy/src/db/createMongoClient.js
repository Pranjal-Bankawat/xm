'use strict';

const _createMongoClient = require('@sapn/mongodb/createMongoClient');
const { MONGO_PORT: port, MONGO_HOST: hostname, MONGO_REPLICA_SET_NAME: replicaSet } = require('@sapn/environment');

/**
 * create a mongo client using environment variables
 * @return {MongoClient}
 */
module.exports = function createMongoClient() {
	return _createMongoClient({
		hostname,
		port,
		replicaSet,
		connectionOptions: {
			minPoolSize: 0,
			maxPoolSize: 2
		}
	});
};
