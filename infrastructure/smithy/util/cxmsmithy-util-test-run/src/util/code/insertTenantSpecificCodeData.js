'use strict';

module.exports = async function insertTenantSpecificCodeData(requestScope, rootData, descriptionData, rootTableName, descriptionTableName) {
	const codesDBConnection = await requestScope.codesDbConnection;
	const tableInsertService = codesDBConnection.createTableInsertService();
	const codesInsertStatements = [];
	codesInsertStatements.push(
		...(await tableInsertService.generateInsertStatements({
			values: rootData,
			tableName: rootTableName
		}))
	);
	if (descriptionData) {
		codesInsertStatements.push(
			...(await tableInsertService.generateInsertStatements({
				values: descriptionData,
				tableName: descriptionTableName
			}))
		);
	}
	await codesDBConnection.executeBatchSqlStatements([...codesInsertStatements]);
};
