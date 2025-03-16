'use strict';

module.exports = function getCodeDataWithoutKeysAndTenantInformation(data) {
	const dataWithoutKeysAndTenant = {};
	for (const [key, value] of Object.entries(data)) {
		if (key !== 'SAP_PK' && key !== 'SAP_PARENT_FK' && key !== 'SAP_ROOT_ID' && key !== 'TENANT_ID') {
			dataWithoutKeysAndTenant[key] = value;
		}
	}
	return dataWithoutKeysAndTenant;
};
