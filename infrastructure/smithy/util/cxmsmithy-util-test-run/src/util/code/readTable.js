'use strict';

module.exports = async function readTable(dbConnection, tableName) {
	const query = dbConnection.createQueryBuilder().select().from(tableName);
	return dbConnection.execute(query);
};
