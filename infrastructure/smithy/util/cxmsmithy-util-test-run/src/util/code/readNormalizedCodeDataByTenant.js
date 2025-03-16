'use strict';

const readTableWithTenantId = require('./readTableWithTenantId');
const getCodeDataWithoutKeysAndTenantInformation = require('./getCodeDataWithoutKeysAndTenantInformation');

function getNormalizedCodeData(code, normalizedCodeInstances) {
	if (code) {
		return normalizedCodeInstances[0];
	} else {
		normalizedCodeInstances.sort((code1, code2) => {
			if (code1.code < code2.code) {
				return -1;
			} else {
				return 1;
			}
		});
		return normalizedCodeInstances;
	}
}

module.exports = async function readNormalizedCodeDataByTenant(sourceRequestScope, tenantId, rootTableName, descriptionTableName, code) {
	const codeRootCollection = await readTableWithTenantId(sourceRequestScope.codesDbConnection, rootTableName, tenantId, code);
	const allCodeDescriptions = await readTableWithTenantId(sourceRequestScope.codesDbConnection, descriptionTableName, tenantId);
	const normalizedCodeInstances = [];
	if (codeRootCollection && codeRootCollection.length > 0) {
		for (const codeInstance of codeRootCollection) {
			const normalizedCodeData = getCodeDataWithoutKeysAndTenantInformation(codeInstance);
			const codeDescriptions = allCodeDescriptions.filter(code => code.SAP_PARENT_FK === codeInstance.SAP_PK);
			normalizedCodeData.descriptions = [];
			for (const codeSourceDescription of codeDescriptions) {
				normalizedCodeData.descriptions.push(getCodeDataWithoutKeysAndTenantInformation(codeSourceDescription));
			}
			normalizedCodeData.descriptions.sort((description1, description2) => {
				if (description1.languageCode < description2.languageCode) {
					return -1;
				} else {
					return 1;
				}
			});
			normalizedCodeInstances.push(normalizedCodeData);
		}
	}
	return getNormalizedCodeData(code, normalizedCodeInstances);
};
