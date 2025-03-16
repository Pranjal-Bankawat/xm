'use strict';

const createPostgresClient = require('./createPostgresClient');
const console = require('node:console');

async function execute(dropSchemaStatement) {
	const pgClient = createPostgresClient();
	try {
		await pgClient.connect();
		await pgClient.query(dropSchemaStatement);
	} catch (error) {
		console.error(`Failed to drop schema ${dropSchemaStatement} due to ${error.toString()}`);
	} finally {
		await endClient(pgClient);
	}
}

async function endClient(pgClient) {
	try {
		await pgClient.end();
	} catch (error) {
		console.error(`Failed to end PG Client due to ${error.toString()}`);
	}
}

module.exports = async function dropSchema(tenantId) {
	const dropSchemaStatement = `DROP SCHEMA IF EXISTS "${tenantId}" CASCADE`;
	await execute(dropSchemaStatement);
};
