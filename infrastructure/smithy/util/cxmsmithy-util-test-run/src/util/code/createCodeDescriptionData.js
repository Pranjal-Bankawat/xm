'use strict';

module.exports = function createCodeDescriptionData(id, parentId, rootId, content, languageCode, tenantId, isDeleted) {
	return {
		SAP_PK: id,
		SAP_PARENT_FK: parentId,
		SAP_ROOT_ID: rootId,
		content,
		languageCode,
		TENANT_ID: tenantId,
		IS_DELETED: isDeleted
	};
};
