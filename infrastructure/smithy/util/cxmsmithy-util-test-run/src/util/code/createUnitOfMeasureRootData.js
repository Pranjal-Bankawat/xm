'use strict';

module.exports = function createUnitOfMeasureRootData(id, rootId, code, isActive, numberOfDecimals, tenantId, isDeleted) {
	return {
		SAP_PK: id,
		SAP_ROOT_ID: rootId,
		code,
		isActive,
		numberOfDecimals,
		isInternationalSystemUnit: false,
		TENANT_ID: tenantId,
		IS_DELETED: isDeleted
	};
};
