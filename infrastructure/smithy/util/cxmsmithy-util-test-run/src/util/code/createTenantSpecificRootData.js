'use strict';

const uuid = require('@sapn/uuid');
const transformDataToDBFormat = require('./transformDataToDBFormat');
const insertTenantSpecificCodeData = require('./insertTenantSpecificCodeData');

module.exports = async function createTenantSpecificRootData(sourceRequestScope, tableName, tenantId, code, additionalData) {
	const rootId = uuid.create();

	const rootData = {
		SAP_PK: rootId,
		SAP_ROOT_ID: rootId,
		code,
		TENANT_ID: tenantId,
		IS_DELETED: false
	};

	if (additionalData) {
		for (const [key, value] of Object.entries(additionalData)) {
			rootData[key] = value;
		}
	}

	const rootDBData = transformDataToDBFormat(rootData);

	await insertTenantSpecificCodeData(sourceRequestScope, [rootDBData], undefined, tableName);
};
