'use strict';

module.exports = function createDistributionChannelRootData(id, rootId, code, tenantId, isDeleted) {
	return {
		SAP_PK: id,
		SAP_ROOT_ID: rootId,
		code,
		TENANT_ID: tenantId,
		IS_DELETED: isDeleted
	};
};
