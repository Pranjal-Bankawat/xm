'use strict';

const uuid = require('@sapn/uuid');
const { unitOfMeasureRootTableName, unitOfMeasureDescriptionTableName } = require('./Constants');
const createUnitOfMeasureRootData = require('./createUnitOfMeasureRootData');
const transformDataToDBFormat = require('./transformDataToDBFormat');
const createCodeDescriptionData = require('./createCodeDescriptionData');
const insertTenantSpecificCodeData = require('./insertTenantSpecificCodeData');

module.exports = async function createTenantSpecificUnitOfMeasureData(sourceRequestScope, tenantId, code1 = '5B', code2 = 'HUR') {
	const unitOfMeasureRootId5B = uuid.create();
	const unitOfMeasureSourceRootData = createUnitOfMeasureRootData(unitOfMeasureRootId5B, unitOfMeasureRootId5B, code1, false, 0, tenantId, false);
	const unitOfMeasureRootSourceDBData = transformDataToDBFormat(unitOfMeasureSourceRootData);
	const unitOfMeasureEnglishDescriptionSourceData = createCodeDescriptionData(
		uuid.create(),
		unitOfMeasureRootId5B,
		unitOfMeasureRootId5B,
		'my english text',
		'en',
		tenantId,
		false
	);
	const unitOfMeasureEnglishDescriptionSourceDBData = transformDataToDBFormat(unitOfMeasureEnglishDescriptionSourceData);
	const unitOfMeasureGermanDescriptionSourceData = createCodeDescriptionData(
		uuid.create(),
		unitOfMeasureRootId5B,
		unitOfMeasureRootId5B,
		'mein deutscher text',
		'de',
		tenantId,
		false
	);
	const unitOfMeasureGermanDescriptionSourceDBData = transformDataToDBFormat(unitOfMeasureGermanDescriptionSourceData);
	const unitOfMeasureDescriptionSourceDBData = [unitOfMeasureEnglishDescriptionSourceDBData, unitOfMeasureGermanDescriptionSourceDBData];

	await insertTenantSpecificCodeData(
		sourceRequestScope,
		[unitOfMeasureRootSourceDBData],
		unitOfMeasureDescriptionSourceDBData,
		unitOfMeasureRootTableName,
		unitOfMeasureDescriptionTableName
	);

	const unitOfMeasureRootIdHUR = uuid.create();
	const unitOfMeasureDeletedSourceRootData = createUnitOfMeasureRootData(unitOfMeasureRootIdHUR, unitOfMeasureRootIdHUR, code2, false, 0, tenantId, true);
	const unitOfMeasureDeletedRootSourceDBData = transformDataToDBFormat(unitOfMeasureDeletedSourceRootData);
	await insertTenantSpecificCodeData(sourceRequestScope, [unitOfMeasureDeletedRootSourceDBData], undefined, unitOfMeasureRootTableName);
};
