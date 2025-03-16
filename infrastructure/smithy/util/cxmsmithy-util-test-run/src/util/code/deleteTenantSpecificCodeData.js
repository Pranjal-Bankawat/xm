'use strict';

const readTable = require('./readTable');

module.exports = async function deleteTenantSpecificCodeData(requestScope, tenantId, rootTableName) {
	const codesDBConnection = await requestScope.codesDbConnection;
	const tableDeleteService = codesDBConnection.createTableDeleteService();

	const codeContent = await readTable(requestScope.codesDbConnection, rootTableName);
	const codeKeysToBeDeleted = [...codeContent.filter(codeInstance => codeInstance.TENANT_ID === tenantId).map(({ SAP_PK }) => SAP_PK)];
	await tableDeleteService.delete(rootTableName, 'SAP_PK', codeKeysToBeDeleted);
};
