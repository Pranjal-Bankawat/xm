'use strict';

const { basename, dirname, join, resolve, sep } = require('node:path');
const { MetadataJSONFilePathAllowPattern } = require('./Constant');

module.exports = class AbstractMetadataFactory {
	static extractUsage(metadata, usageMap) {
		switch (metadata.type) {
			case 'api':
				this.extractUsageEntityReference(metadata, usageMap);
				break;
			case 'businessobject':
				this.extractUsageDetermination(metadata, usageMap);
				this.extractUsageNodeReference(metadata, usageMap);
				this.extractUsageElementDataType(metadata.elements, usageMap, metadata.relativeFilePath);
				break;
			case 'datatype':
				this.extractUsageElementDataType(metadata.elements, usageMap, metadata.relativeFilePath);
				this.extractUsageProxyName(metadata, usageMap);
				break;
			case 'event':
				this.extractUsageLabelTextId(metadata, usageMap, metadata.relativeFilePath);
				this.extractUsageEventTopicReference(metadata, usageMap, metadata.relativeFilePath);
				this.extractUsageEntityReference(metadata, usageMap);
				break;
			case 'service':
				this.extractUsageLabelTextId(metadata, usageMap, metadata.relativeFilePath);
				break;
			case 'entitycontent':
				this.extractUsageItemLabelTextId(metadata.content, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
				break;
			case 'entity':
				this.extractUsageLabelTextId(metadata, usageMap, metadata.relativeFilePath);
				this.extractUsageItemLabelTextId(metadata.attributes, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
				this.extractUsageItemEntityReference(metadata.attributes, usageMap, metadata.relativeFilePath);
				this.extractUsageAnchorId(metadata.anchors, usageMap, metadata.relativeFilePath);
				break;
			case 'uiview':
				this.extractUsageLabelTextId(metadata, usageMap, metadata.relativeFilePath);
				this.extractUsageItemLabelTextId(metadata.additionalTexts, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
				this.extractUsageItemLabelTextId(metadata.customQueries, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
				this.extractUsageItemLabelTextId(metadata.events, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
				this.extractUsageItemLabelTextId(metadata.navMenu, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
				this.extractUsageLayoutLabelTextId(metadata.layouts, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
				this.extractUsageFieldSetLabelTextId(metadata.fieldSets, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
				this.extractUsageAnchorId(metadata.anchors, usageMap, metadata.relativeFilePath);
				this.extractUsageItemLabelTextId(metadata.queries, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
				break;
			case 'uiapp':
				this.extractUsageLabelTextId(metadata, usageMap, metadata.relativeFilePath);
				this.extractUsageItemLabelTextId(Object.values(metadata.components ?? {}), metadata.serviceFullName, usageMap, metadata.relativeFilePath);
				break;
			case 'messagegroup':
				this.extractUsageSystemMessageLabelTextId(metadata.systemMessages, usageMap, metadata.relativeFilePath);
				break;
			case 'textcontent':
				this.extractUsageTextGroup(metadata, usageMap, metadata.relativeFilePath);
				break;
		}
	}

	static extractUsageFieldSetLabelTextId(fieldSets, serviceFullName, usageMap, relativeFilePath) {
		if (fieldSets) {
			for (const { labelTextId, fields, items, groups, entity } of fieldSets) {
				this.extractUsageTextId(serviceFullName, labelTextId, usageMap, relativeFilePath);
				this.extractUsageItemLabelTextId(fields, serviceFullName, usageMap, relativeFilePath);
				this.extractUsageItemLabelTextId(items, serviceFullName, usageMap, relativeFilePath);
				this.extractUsageItemLabelTextId(groups, serviceFullName, usageMap, relativeFilePath);
				if (entity) {
					this.extractUsageEntityBindingProperties(entity, fields, usageMap, relativeFilePath);
				}
			}
		}
	}

	static extractUsageLayoutLabelTextId(layouts, serviceFullName, usageMap, relativeFilePath) {
		if (layouts) {
			for (const { sections } of layouts) {
				this.extractUsageItemLabelTextId(sections, serviceFullName, usageMap, relativeFilePath);
			}
		}
	}

	static extractUsageItemLabelTextId(items, serviceFullName, usageMap, relativeFilePath) {
		if (items) {
			for (const { labelTextId, descriptionTextId, objectDefinition } of items) {
				this.extractUsageTextId(serviceFullName, labelTextId, usageMap, relativeFilePath);
				this.extractUsageTextId(serviceFullName, descriptionTextId, usageMap, relativeFilePath);
				if (Array.isArray(objectDefinition)) {
					this.extractUsageItemLabelTextId(objectDefinition, serviceFullName, usageMap, relativeFilePath);
				}
			}
		}
	}

	static extractUsageEntityBindingProperties(entity, fields, usageMap, relativeFilePath) {
		for (const { binding = '' } of fields ?? []) {
			const entityWithPath = [entity, ...binding.split('.')].join('/');
			if (!usageMap.has(entityWithPath)) {
				usageMap.set(entityWithPath, new Set());
			}
			usageMap.get(entityWithPath).add(relativeFilePath);
		}
	}

	static extractUsageSystemMessageLabelTextId(systemMessages, usageMap, relativeFilePath) {
		if (systemMessages) {
			for (const { messageTextId } of systemMessages) {
				const serviceFullName = messageTextId.split('.');
				const messageId = serviceFullName.pop();
				const messageGroup = serviceFullName.pop();
				this.extractUsageTextId(serviceFullName.join('.'), [messageGroup, messageId].join('.'), usageMap, relativeFilePath);
			}
		}
	}

	static extractUsageEventTopicReference({ eventTopicReference }, usageMap, relativeFilePath) {
		if (eventTopicReference) {
			if (!usageMap.has(eventTopicReference)) {
				usageMap.set(eventTopicReference, new Set());
			}
			usageMap.get(eventTopicReference).add(relativeFilePath);
		}
	}

	static extractUsageLabelTextId({ serviceFullName, labelTextId, descriptionTextId, pluralLabelTextId }, usageMap, relativeFilePath) {
		if (labelTextId) {
			this.extractUsageTextId(serviceFullName, labelTextId, usageMap, relativeFilePath);
		}
		if (descriptionTextId) {
			this.extractUsageTextId(serviceFullName, descriptionTextId, usageMap, relativeFilePath);
		}
		if (pluralLabelTextId) {
			this.extractUsageTextId(serviceFullName, pluralLabelTextId, usageMap, relativeFilePath);
		}
	}

	static extractUsageTextId(serviceFullName, textId, usageMap, relativeFilePath) {
		if (textId) {
			const fullTextId = textId.startsWith('sap.crm.') ? textId : [serviceFullName, textId].join('.');
			if (!usageMap.has(fullTextId)) {
				usageMap.set(fullTextId, new Set());
			}
			usageMap.get(fullTextId).add(relativeFilePath);
		}
	}

	static extractUsageTextGroup({ serviceFullNames = ['sap.crm.common'], groups }, usageMap, relativeFilePath) {
		for (const serviceFullName of serviceFullNames) {
			if (groups) {
				for (const [groupId, texts] of Object.entries(groups)) {
					const groupFullName = [serviceFullName, groupId].join('.');
					if (!usageMap.has(groupFullName)) {
						usageMap.set(groupFullName, new Set());
					}
					usageMap.get(groupFullName).add(relativeFilePath);
					for (const [textId] of Object.entries(texts)) {
						const textFullName = [groupFullName, textId].join('.');
						if (!usageMap.has(textFullName)) {
							usageMap.set(textFullName, new Set());
						}
						usageMap.get(textFullName).add(relativeFilePath);
					}
				}
			}
		}
	}

	static extractUsageAnchorId(anchors, usageMap, relativeFilePath) {
		if (anchors) {
			for (const anchor of anchors) {
				if (anchor.id) {
					if (!usageMap.has(anchor.id)) {
						usageMap.set(anchor.id, new Set());
					}
					usageMap.get(anchor.id).add(relativeFilePath);
				}
			}
		}
	}

	static extractUsageEntityReference(metadata, usageMap) {
		if (metadata.entityReference) {
			if (!usageMap.has(metadata.entityReference)) {
				usageMap.set(metadata.entityReference, new Set());
			}
			usageMap.get(metadata.entityReference).add(metadata.relativeFilePath);
		}
	}

	static extractUsageItemEntityReference(items, usageMap, relativeFilePath) {
		if (items) {
			for (const { dataType, itemDataType, entityReference, objectDefinition } of items) {
				if (dataType === 'ARRAY' && itemDataType === 'OBJECT') {
					if (entityReference) {
						this.extractUsageEntityReference({ entityReference, relativeFilePath }, usageMap);
					} else if (Array.isArray(objectDefinition)) {
						this.extractUsageItemEntityReference(objectDefinition, usageMap, relativeFilePath);
					}
				}
			}
		}
	}

	static extractUsageDetermination(metadata, usageMap) {
		for (const determination of metadata.determinations ?? []) {
			if (!usageMap.has(determination.name)) {
				usageMap.set(determination.name, new Set());
			}
			usageMap.get(determination.name).add(metadata.relativeFilePath);
		}
	}

	static extractUsageNodeReference(metadata, usageMap) {
		const relativeFileDirectory = dirname(metadata.relativeFilePath);
		for (const relativeFilePath of metadata.nodes ?? []) {
			const nodeReferenceRelativeFilePath = join(relativeFileDirectory, relativeFilePath);
			if (!usageMap.has(nodeReferenceRelativeFilePath)) {
				usageMap.set(nodeReferenceRelativeFilePath, new Set());
			}
			usageMap.get(nodeReferenceRelativeFilePath).add(metadata.relativeFilePath);
		}
	}

	static extractUsageElementDataType(elements, usageMap, relativeFilePath) {
		if (elements) {
			for (const element of elements) {
				if (element.dataType) {
					if (!usageMap.has(element.dataType)) {
						usageMap.set(element.dataType, new Set());
					}
					usageMap.get(element.dataType).add(relativeFilePath);
				}
				this.extractUsageElementDataType(element.elements, usageMap, relativeFilePath);
			}
		}
	}

	static extractUsageProxyName(metadata, usageMap) {
		if (metadata.proxyName) {
			if (!usageMap.has(metadata.proxyName)) {
				usageMap.set(metadata.proxyName, new Set());
			}
			usageMap.get(metadata.proxyName).add(metadata.relativeFilePath);
		}
	}

	static extractFullName({ fullName, fullNames, relativeFilePath }, fullNameMap) {
		if (fullNames) {
			fullNames.forEach(fullName => this.extractFullName({ fullName, relativeFilePath }, fullNameMap));
		} else {
			if (!fullNameMap.has(fullName)) {
				fullNameMap.set(fullName, new Set());
			}
			fullNameMap.get(fullName).add(relativeFilePath);
		}
	}

	static determineWorkspace(relativeFilePath, workspaceMap) {
		let context = '';
		for (const directory of relativeFilePath.split(sep)) {
			context = join(context, directory);
			if (workspaceMap.has(context)) {
				return workspaceMap.get(context);
			}
		}
	}

	static extractMetadata(relativeFilePath, fileContent, workspaceMap, workspaceRootDirectory) {
		const workspace = this.determineWorkspace(relativeFilePath, workspaceMap);
		const [, category, categoryType] = relativeFilePath.match(MetadataJSONFilePathAllowPattern);
		const type = category === 'content' ? [categoryType, category].join('') : categoryType;
		const absoluteFilePath = resolve(workspaceRootDirectory, relativeFilePath);
		const extractedFileContent = { name: fileContent.name, type, relativeFilePath, absoluteFilePath, workspace };
		switch (type) {
			case 'analyticalmodel':
				Object.assign(extractedFileContent, {
					fullName: fileContent.fullName,
					labelTextId: fileContent.labelTextId,
					serviceFullName: fileContent.serviceFullName
				});
				break;
			case 'api':
				Object.assign(extractedFileContent, {
					entityReference: fileContent.entityReference,
					fullName: fileContent.fullName,
					operations: fileContent.operations,
					serviceFullName: fileContent.serviceFullName
				});
				break;
			case 'businessobject':
				Object.assign(extractedFileContent, {
					associations: fileContent.associations,
					determinations: fileContent.determinations,
					elements: fileContent.elements,
					fullName: [fileContent.namespace, fileContent.name].join('/'),
					isRoot: fileContent.isRoot,
					namespace: fileContent.namespace,
					nodes: fileContent.nodes,
					validations: fileContent.validations,
					indices: fileContent.indices
				});
				break;
			case 'datatype':
				Object.assign(extractedFileContent, {
					elements: fileContent.elements,
					fullName: [fileContent.namespace, fileContent.name].join('/'),
					implementationType: fileContent.implementationType,
					namespace: fileContent.namespace,
					proxyName: fileContent.proxyName,
					representationTerm: fileContent.representationTerm,
					valueRangeSpecification: fileContent.valueRangeSpecification
				});
				break;
			case 'entity':
				Object.assign(extractedFileContent, {
					anchors: fileContent.anchors,
					attributes: fileContent.attributes,
					entityType: fileContent.entityType,
					fullName: fileContent.fullName,
					labelTextId: fileContent.labelTextId,
					pluralLabelTextId: fileContent.pluralLabelTextId,
					serviceFullName: fileContent.serviceFullName,
					root: fileContent.root
				});
				break;
			case 'entitycontent':
				Object.assign(extractedFileContent, {
					anchors: fileContent.anchors,
					content: fileContent.content,
					entityReference: fileContent.entityReference,
					fullName: fileContent.fullName,
					serviceFullName: fileContent.serviceFullName
				});
				break;
			case 'event':
				Object.assign(extractedFileContent, {
					entityReference: fileContent.entityReference,
					eventTopicReference: fileContent.eventTopicReference,
					fullName: fileContent.fullName,
					labelTextId: fileContent.labelTextId,
					serviceFullName: fileContent.serviceFullName
				});
				break;
			case 'eventtopic':
				Object.assign(extractedFileContent, {
					fullName: fileContent.fullName,
					serviceFullName: fileContent.serviceFullName
				});
				break;
			case 'messagegroup':
				Object.assign(extractedFileContent, {
					fullName: fileContent.fullName,
					serviceFullName: fileContent.serviceFullName,
					systemMessages: fileContent.systemMessages,
					errors: fileContent.errors,
					infos: fileContent.infos
				});
				break;
			case 'service':
				Object.assign(extractedFileContent, {
					analyticalModels: fileContent.analyticalModels,
					apis: fileContent.apis,
					entities: fileContent.entities,
					events: fileContent.events,
					eventTopics: fileContent.eventTopics,
					fullName: fileContent.fullName,
					labelTextId: fileContent.labelTextId,
					serviceFullName: fileContent.fullName,
					tasks: fileContent.tasks,
					uiApps: fileContent.uiApps,
					uiViews: fileContent.uiViews
				});
				break;
			case 'serviceadaptation':
				Object.assign(extractedFileContent, {
					autoExposeElements: fileContent.autoExposeElements,
					binding: fileContent.binding,
					elements: fileContent.elements,
					nodes: fileContent.nodes,
					fullName: fileContent.fullName,
					serviceFullName: fileContent.serviceFullName
				});
				break;
			case 'textcontent': {
				const name = basename(relativeFilePath, '.json');
				const { serviceFullNames = ['sap.crm.common'], fullName, ...groups } = fileContent;
				const fullNames = fullName ? [fullName] : serviceFullNames.map(serviceFullName => [serviceFullName, 'terminology'].join('.'));
				Object.assign(extractedFileContent, {
					fullNames,
					groups,
					name,
					serviceFullNames
				});
				break;
			}
			case 'uiapp':
				Object.assign(extractedFileContent, {
					components: fileContent.components,
					fullName: fileContent.fullName,
					labelTextId: fileContent.labelTextId,
					serviceFullName: fileContent.serviceFullName
				});
				break;
			case 'uiview':
				Object.assign(extractedFileContent, {
					additionalTexts: fileContent.additionalTexts,
					anchors: fileContent.anchors,
					customQueries: fileContent.customQueries,
					events: fileContent.events,
					fieldSets: fileContent.fieldSets,
					fullName: fileContent.fullName,
					labelTextId: fileContent.labelTextId,
					layouts: fileContent.layouts,
					navMenu: fileContent.navMenu,
					serviceFullName: fileContent.serviceFullName,
					queries: fileContent.queries
				});
				break;
			case 'task':
				Object.assign(extractedFileContent, {
					fullName: fileContent.fullName,
					serviceFullName: fileContent.serviceFullName
				});
				break;
		}

		return extractedFileContent;
	}
};
