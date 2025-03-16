'use strict';

const readTable = require('./readTable');

module.exports = async function deleteAllTenantSpecificCodeData(requestScope, tableName) {
	const codesDBConnection = await requestScope.codesDbConnection;
	const tableDeleteService = codesDBConnection.createTableDeleteService();

	const unitOfMeasureContent = await readTable(requestScope.codesDbConnection, tableName);
	const codeKeysToBeDeleted = [...unitOfMeasureContent.filter(codeInstance => codeInstance.TENANT_ID !== '000000000000000000000000').map(({ SAP_PK }) => SAP_PK)];
	await tableDeleteService.delete(tableName, 'SAP_PK', codeKeysToBeDeleted);
};
