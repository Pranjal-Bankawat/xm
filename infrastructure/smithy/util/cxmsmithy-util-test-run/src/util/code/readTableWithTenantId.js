'use strict';

module.exports = async function readTableWithTenantId(dbConnection, tableName, tenantId, code) {
	let query;
	if (code) {
		query = dbConnection.createQueryBuilder().select().from(tableName).where('TENANT_ID', '=', tenantId).and('code', '=', code);
	} else {
		query = dbConnection.createQueryBuilder().select().from(tableName).where('TENANT_ID', '=', tenantId);
	}
	return dbConnection.execute(query);
};
