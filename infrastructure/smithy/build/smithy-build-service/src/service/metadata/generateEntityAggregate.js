'use strict';

const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

module.exports = async function generateEntityAggregate(packageMetadataEntityDirectoryPath, entityMetadataFiles) {
	const fileContentPromises = [];
	for (const entityMetadataFile of entityMetadataFiles) {
		const filePath = resolve(packageMetadataEntityDirectoryPath, entityMetadataFile);
		fileContentPromises.push(await readFile(filePath, 'utf8'));
	}
	const fileContents = await Promise.all(fileContentPromises);
	const entityMetadataMap = new Map();
	const entityAggregates = [];
	for (const content of fileContents) {
		const metadata = JSON.parse(content);
		entityMetadataMap.set(metadata.fullName, metadata);
		metadata.$entities = [];
		if (metadata.root) {
			entityAggregates.push(metadata);
		}
	}
	for (const metadata of entityMetadataMap.values()) {
		resolveEntityReferences(entityMetadataMap, metadata);
	}

	for (const aggregateMetadata of entityAggregates) {
		aggregateMetadata.$entities = flattenEntityReferrals(entityMetadataMap, aggregateMetadata);
	}
	return entityAggregates;
};

function flattenEntityReferrals(entityMetadataMap, entityMetadata) {
	const entities = new Set();
	for (const entity of entityMetadata.$entities) {
		entities.add(entity);
		const entityReferenceMetadata = entityMetadataMap.get(entity);
		if (entityReferenceMetadata.$entities.length > 0) {
			for (const referral of flattenEntityReferrals(entityMetadataMap, entityReferenceMetadata)) {
				entities.add(referral);
			}
		}
	}
	return Array.from(entities);
}

function resolveEntityReferences(entityMetadataMap, entityMetadata) {
	for (const attribute of entityMetadata.attributes) {
		if ('entityReference' in attribute && typeof attribute.objectDefinition === 'string') {
			entityMetadata.$entities.push(attribute.entityReference);
			const { name, fullName, serviceFullName, entityType, root, attributes: objectDefinition, ...rest } = entityMetadataMap.get(attribute.entityReference);
			Object.assign(attribute, { objectDefinition, ...rest });
		}
	}
}
