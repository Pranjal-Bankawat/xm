'use strict';

const AbstractMetadataFactory = require('../src/AbstractMetadataFactory');
const assert = require('node:assert');

let metadata, fullNameMap, usageMap, workspaceMap, workspaceRootDirectory;

describe('AbstractMetadataFactory', function () {
	beforeEach(function () {
		fullNameMap = new Map();
		usageMap = new Map();
		workspaceMap = new Map();
		metadata = {
			relativeFilePath: 'some/relative/file/path'
		};
		workspaceRootDirectory = '/workspaceRootDirectory';
	});

	describe('extractUsage()', function () {
		it('shall extract the api usage', function () {
			metadata.type = 'api';
			metadata.entityReference = 'someEntityFullName';
			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			metadata.relativeFilePath = 'some/other/relative/file/path';
			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(usageMap, new Map([['someEntityFullName', new Set(['some/relative/file/path', 'some/other/relative/file/path'])]]));
		});

		it('shall extract the business object usage', function () {
			metadata.type = 'businessobject';
			metadata.elements = [
				{
					dataType: 'someDataType'
				},
				{
					dataType: 'someStructureDataType',
					elements: [
						{
							dataType: 'someOtherDataType'
						},
						{
							implementationType: 'someImplementationType'
						}
					]
				}
			];

			metadata.nodes = ['./Node1', './Node2'];
			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['some/relative/file/Node1', new Set(['some/relative/file/path'])],
					['some/relative/file/Node2', new Set(['some/relative/file/path'])],
					['someDataType', new Set(['some/relative/file/path'])],
					['someStructureDataType', new Set(['some/relative/file/path'])],
					['someOtherDataType', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall extract the data type usage', function () {
			metadata.type = 'datatype';
			metadata.elements = [
				{
					dataType: 'someDataType'
				},
				{
					dataType: 'someStructureDataType',
					elements: [
						{
							dataType: 'someOtherDataType'
						}
					]
				}
			];
			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someDataType', new Set(['some/relative/file/path'])],
					['someStructureDataType', new Set(['some/relative/file/path'])],
					['someOtherDataType', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall extract the event usage', function () {
			metadata.type = 'event';
			metadata.serviceFullName = 'someServiceFullName';
			metadata.entityReference = 'someEntityFullName';
			metadata.eventTopicReference = 'someEventTopicFullName';
			metadata.labelTextId = 'someLabelTextId';
			metadata.descriptionTextId = 'someDescriptionTextId';
			metadata.pluralLabelTextId = 'somePluralLabelTextId';

			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.someLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someDescriptionTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.somePluralLabelTextId', new Set(['some/relative/file/path'])],
					['someEntityFullName', new Set(['some/relative/file/path'])],
					['someEventTopicFullName', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall extract the service usage', function () {
			metadata.type = 'service';
			metadata.serviceFullName = 'someServiceFullName';
			metadata.labelTextId = 'someLabelTextId';
			metadata.descriptionTextId = 'someDescriptionTextId';
			metadata.pluralLabelTextId = 'somePluralLabelTextId';

			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.someLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someDescriptionTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.somePluralLabelTextId', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall extract the entity content usage', function () {
			metadata.type = 'entitycontent';
			metadata.serviceFullName = 'someServiceFullName';
			metadata.content = [{ labelTextId: 'someLabelTextId' }, { descriptionTextId: 'someDescriptionTextId' }];

			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.someLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someDescriptionTextId', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall extract the entity usage', function () {
			metadata.type = 'entity';
			metadata.serviceFullName = 'someServiceFullName';
			metadata.labelTextId = 'someLabelTextId';
			metadata.descriptionTextId = 'someDescriptionTextId';
			metadata.pluralLabelTextId = 'somePluralLabelTextId';
			metadata.attributes = [{ labelTextId: 'someLabelTextId' }, { descriptionTextId: 'someDescriptionTextId' }];
			metadata.anchors = [{ id: 'anchorId1' }, { id: 'anchorId2' }];
			metadata.attributes = [
				{
					dataType: 'ARRAY',
					itemDataType: 'OBJECT',
					entityReference: 'someEntityReference'
				},
				{
					dataType: 'ARRAY',
					itemDataType: 'OBJECT'
				},
				{
					dataType: 'STRING'
				},
				{
					dataType: 'ARRAY',
					itemDataType: 'OBJECT',
					objectDefinition: [
						{
							dataType: 'ARRAY',
							itemDataType: 'OBJECT',
							entityReference: 'someInlineEntityReference'
						},
						{
							dataType: 'STRING'
						}
					]
				}
			];

			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['anchorId1', new Set(['some/relative/file/path'])],
					['anchorId2', new Set(['some/relative/file/path'])],
					['someServiceFullName.someLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.somePluralLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someDescriptionTextId', new Set(['some/relative/file/path'])],
					['someEntityReference', new Set(['some/relative/file/path'])],
					['someInlineEntityReference', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall extract the uiview usage', function () {
			metadata.type = 'uiview';
			metadata.serviceFullName = 'someServiceFullName';
			metadata.labelTextId = 'someLabelTextId';
			metadata.descriptionTextId = 'someDescriptionTextId';
			metadata.pluralLabelTextId = 'somePluralLabelTextId';
			metadata.additionalTexts = [{ labelTextId: 'someAdditionalTextLabelTextId' }];
			metadata.customQueries = [{ labelTextId: 'someCustomQueryLabelTextId' }];
			metadata.events = [{ labelTextId: 'someEventLabelTextId' }];
			metadata.navMenu = [{ labelTextId: 'someNavMenuLabelTextId' }];
			metadata.layouts = [{ sections: [{ labelTextId: 'someLayoutLabelTextId' }] }];
			metadata.fieldSets = [
				{
					labelTextId: 'someFieldSetLabelTextId',
					items: [{ labelTextId: 'someItemLabelTextId' }],
					groups: [{ labelTextId: 'someGroupLabelTextId' }],
					entity: 'some.entity.full.name'
				},
				{
					labelTextId: 'someFieldSetLabelTextId',
					fields: [{ labelTextId: 'someFieldLabelTextId', binding: 'some.binding' }],
					items: [{ labelTextId: 'someItemLabelTextId' }],
					groups: [{ labelTextId: 'someGroupLabelTextId' }],
					entity: 'some.entity.full.name'
				}
			];
			metadata.anchors = [{ id: 'anchorId1' }, { id: 'anchorId2' }];

			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['anchorId1', new Set(['some/relative/file/path'])],
					['anchorId2', new Set(['some/relative/file/path'])],
					['someServiceFullName.someLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someDescriptionTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.somePluralLabelTextId', new Set(['some/relative/file/path'])],
					['some.entity.full.name/some/binding', new Set(['some/relative/file/path'])],
					['someServiceFullName.someAdditionalTextLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someCustomQueryLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someEventLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someFieldLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someFieldSetLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someGroupLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someItemLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someLayoutLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someNavMenuLabelTextId', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall extract the uiapp usage', function () {
			metadata.type = 'uiapp';
			metadata.serviceFullName = 'someServiceFullName';
			metadata.labelTextId = 'someLabelTextId';
			metadata.descriptionTextId = 'someDescriptionTextId';
			metadata.pluralLabelTextId = 'somePluralLabelTextId';
			metadata.components = {
				component1: { labelTextId: 'someLabelTextId' },
				component2: { descriptionTextId: 'someDescriptionTextId' }
			};

			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.someLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.somePluralLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someDescriptionTextId', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall extract the text content usage', function () {
			metadata.type = 'textcontent';
			metadata.serviceFullNames = ['someServiceFullName'];
			metadata.groups = {
				group1: {
					textId1: 'someTextId1',
					textId2: 'someTextId2'
				},
				group2: {
					textId1: 'someTextId1'
				}
			};

			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.group1', new Set(['some/relative/file/path'])],
					['someServiceFullName.group2', new Set(['some/relative/file/path'])],
					['someServiceFullName.group1.textId1', new Set(['some/relative/file/path'])],
					['someServiceFullName.group1.textId2', new Set(['some/relative/file/path'])],
					['someServiceFullName.group2.textId1', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall extract the message group usage', function () {
			metadata.type = 'messagegroup';
			metadata.systemMessages = [
				{
					messageTextId: 'someServiceFullName.group1.textId1'
				},
				{
					messageTextId: 'someServiceFullName.group1.textId2'
				},
				{
					messageTextId: 'someServiceFullName.group2.textId1'
				}
			];

			AbstractMetadataFactory.extractUsage(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.group1.textId1', new Set(['some/relative/file/path'])],
					['someServiceFullName.group1.textId2', new Set(['some/relative/file/path'])],
					['someServiceFullName.group2.textId1', new Set(['some/relative/file/path'])]
				])
			);
		});
	});

	describe('extractUsageNodeReference()', function () {
		beforeEach(function () {
			metadata.nodes = ['./Node1', './Node2'];
			usageMap.set('some/relative/file/Node2', new Set(['some/relative/file/usage']));
		});

		it('shall extract the business object usage', function () {
			AbstractMetadataFactory.extractUsageNodeReference(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['some/relative/file/Node1', new Set(['some/relative/file/path'])],
					['some/relative/file/Node2', new Set(['some/relative/file/path', 'some/relative/file/usage'])]
				])
			);
		});
	});

	describe('extractUsageDetermination()', function () {
		beforeEach(function () {
			metadata.determinations = [{ name: 'SetSomeDefaultDetermination' }, { name: 'SetSomeSpecificDetermination' }];
			usageMap.set('SetSomeDefaultDetermination', new Set(['some/relative/file/usage']));
		});

		it('shall extract the business object usage', function () {
			AbstractMetadataFactory.extractUsageDetermination(metadata, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['SetSomeSpecificDetermination', new Set(['some/relative/file/path'])],
					['SetSomeDefaultDetermination', new Set(['some/relative/file/path', 'some/relative/file/usage'])]
				])
			);
		});
	});

	describe('extractUsageElementDataType()', function () {
		beforeEach(function () {
			metadata.elements = [
				{
					dataType: 'someDataType'
				},
				{
					dataType: 'someStructureDataType',
					elements: [
						{
							dataType: 'someOtherDataType'
						},
						{
							implementationType: 'someImplementationType'
						}
					]
				}
			];

			usageMap.set('someOtherDataType', new Set(['some/relative/file/usage']));
		});

		it('shall extract the business object usage', function () {
			AbstractMetadataFactory.extractUsageElementDataType(metadata.elements, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someDataType', new Set(['some/relative/file/path'])],
					['someStructureDataType', new Set(['some/relative/file/path'])],
					['someOtherDataType', new Set(['some/relative/file/path', 'some/relative/file/usage'])]
				])
			);
		});
	});

	describe('extractUsageProxyName()', function () {
		beforeEach(function () {
			metadata.proxyName = 'someProxyName';

			usageMap.set('someOtherProxyName', new Set(['some/relative/file/usage']));
		});

		it('shall extract the business object usage', function () {
			AbstractMetadataFactory.extractUsageProxyName(metadata, usageMap);
			AbstractMetadataFactory.extractUsageProxyName({ ...metadata, proxyName: 'someOtherProxyName' }, usageMap);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someProxyName', new Set(['some/relative/file/path'])],
					['someOtherProxyName', new Set(['some/relative/file/path', 'some/relative/file/usage'])]
				])
			);
		});
	});

	describe('extractUsageLabelTextId()', function () {
		beforeEach(function () {
			metadata.serviceFullName = 'someServiceFullName';
			metadata.labelTextId = 'someLabelTextId';
			metadata.descriptionTextId = 'someDescriptionTextId';
			metadata.pluralLabelTextId = 'somePluralLabelTextId';
		});

		it('shall extract the label text id', function () {
			AbstractMetadataFactory.extractUsageLabelTextId(metadata, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.someLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someDescriptionTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.somePluralLabelTextId', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall skip if no label text id is provided', function () {
			AbstractMetadataFactory.extractUsageLabelTextId({}, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(usageMap, new Map());
		});
	});

	describe('extractUsageTextId()', function () {
		beforeEach(function () {
			metadata.serviceFullName = 'someServiceFullName';
			metadata.textIds = ['someTextId1', 'sap.crm.someTextId2'];

			usageMap.set('someServiceFullName.someTextId1', new Set(['some/relative/file/usage']));
		});

		it('shall extract the text id', function () {
			AbstractMetadataFactory.extractUsageTextId(metadata.serviceFullName, metadata.textIds[0], usageMap, metadata.relativeFilePath);
			AbstractMetadataFactory.extractUsageTextId(metadata.serviceFullName, metadata.textIds[1], usageMap, metadata.relativeFilePath);
			AbstractMetadataFactory.extractUsageTextId(metadata.serviceFullName, undefined, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.someTextId1', new Set(['some/relative/file/path', 'some/relative/file/usage'])],
					['sap.crm.someTextId2', new Set(['some/relative/file/path'])]
				])
			);
		});
	});

	describe('extractUsageItemLabelTextId()', function () {
		beforeEach(function () {
			metadata.serviceFullName = 'someServiceFullName';
			metadata.items = [{ labelTextId: 'someLabelTextId' }, { descriptionTextId: 'someDescriptionTextId' }];

			usageMap.set('someServiceFullName.someLabelTextId', new Set(['some/relative/file/usage']));
		});

		it('shall extract the text id', function () {
			AbstractMetadataFactory.extractUsageItemLabelTextId(metadata.items, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.someLabelTextId', new Set(['some/relative/file/path', 'some/relative/file/usage'])],
					['someServiceFullName.someDescriptionTextId', new Set(['some/relative/file/path'])]
				])
			);
		});
	});

	describe('extractUsageAnchorId()', function () {
		beforeEach(function () {
			metadata.serviceFullName = 'someServiceFullName';
			metadata.anchors = [{ id: 'anchorId1' }, { id: 'anchorId2' }, { nonid: 'anchorId2' }];

			usageMap.set('anchorId1', new Set(['some/relative/file/usage']));
		});

		it('shall extract the text id', function () {
			AbstractMetadataFactory.extractUsageAnchorId(metadata.anchors, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['anchorId1', new Set(['some/relative/file/path', 'some/relative/file/usage'])],
					['anchorId2', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall skip if no label text id is provided', function () {
			AbstractMetadataFactory.extractUsageAnchorId(undefined, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(usageMap, new Map([['anchorId1', new Set(['some/relative/file/usage'])]]));
		});
	});

	describe('extractUsageTextGroup()', function () {
		beforeEach(function () {
			metadata.serviceFullNames = ['someServiceFullName'];
			metadata.groups = {
				group1: {
					textId1: 'someTextId1',
					textId2: 'someTextId2'
				},
				group2: {
					textId1: 'someTextId1'
				}
			};

			usageMap.set('someServiceFullName.group1', new Set(['some/relative/file/usage']));
			usageMap.set('someServiceFullName.group1.textId1', new Set(['some/relative/file/usage']));
		});

		it('shall extract the text id', function () {
			AbstractMetadataFactory.extractUsageTextGroup(metadata, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.group1', new Set(['some/relative/file/path', 'some/relative/file/usage'])],
					['someServiceFullName.group2', new Set(['some/relative/file/path'])],
					['someServiceFullName.group1.textId1', new Set(['some/relative/file/path', 'some/relative/file/usage'])],
					['someServiceFullName.group1.textId2', new Set(['some/relative/file/path'])],
					['someServiceFullName.group2.textId1', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall skip if no label text id is provided', function () {
			AbstractMetadataFactory.extractUsageTextGroup({}, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.group1', new Set(['some/relative/file/usage'])],
					['someServiceFullName.group1.textId1', new Set(['some/relative/file/usage'])]
				])
			);
		});
	});

	describe('extractUsageLayoutLabelTextId()', function () {
		beforeEach(function () {
			metadata.serviceFullName = 'someServiceFullName';
			metadata.layouts = [{ sections: [{ labelTextId: 'someLabelTextId' }, { descriptionTextId: 'someDescriptionTextId' }] }];

			usageMap.set('someServiceFullName.someLabelTextId', new Set(['some/relative/file/usage']));
		});

		it('shall extract the text id', function () {
			AbstractMetadataFactory.extractUsageLayoutLabelTextId(metadata.layouts, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.someLabelTextId', new Set(['some/relative/file/path', 'some/relative/file/usage'])],
					['someServiceFullName.someDescriptionTextId', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall skip if no label text id is provided', function () {
			AbstractMetadataFactory.extractUsageLayoutLabelTextId(undefined, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(usageMap, new Map([['someServiceFullName.someLabelTextId', new Set(['some/relative/file/usage'])]]));
		});
	});

	describe('extractUsageFieldSetLabelTextId()', function () {
		beforeEach(function () {
			metadata.serviceFullName = 'someServiceFullName';
			metadata.fieldSets = [
				{
					labelTextId: 'someFieldSetLabelTextId',
					fields: [{ labelTextId: 'someFieldLabelTextId' }],
					items: [{ labelTextId: 'someItemLabelTextId' }],
					groups: [{ labelTextId: 'someGroupLabelTextId' }]
				}
			];

			usageMap.set('someServiceFullName.someFieldSetLabelTextId', new Set(['some/relative/file/usage']));
		});

		it('shall extract the text id', function () {
			AbstractMetadataFactory.extractUsageFieldSetLabelTextId(metadata.fieldSets, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(
				usageMap,
				new Map([
					['someServiceFullName.someFieldSetLabelTextId', new Set(['some/relative/file/path', 'some/relative/file/usage'])],
					['someServiceFullName.someFieldLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someItemLabelTextId', new Set(['some/relative/file/path'])],
					['someServiceFullName.someGroupLabelTextId', new Set(['some/relative/file/path'])]
				])
			);
		});

		it('shall skip if no field sets provided', function () {
			AbstractMetadataFactory.extractUsageFieldSetLabelTextId(undefined, metadata.serviceFullName, usageMap, metadata.relativeFilePath);
			assert.deepStrictEqual(usageMap, new Map([['someServiceFullName.someFieldSetLabelTextId', new Set(['some/relative/file/usage'])]]));
		});
	});

	describe('extractFullName()', function () {
		beforeEach(function () {
			metadata.fullName = 'someFullName';

			fullNameMap.set('someOtherFullName', new Set(['some/relative/file/other']));
		});

		it('shall extract the full name', function () {
			AbstractMetadataFactory.extractFullName(metadata, fullNameMap);
			AbstractMetadataFactory.extractFullName(Object.assign({}, metadata, { fullName: 'someOtherFullName' }), fullNameMap);
			assert.deepStrictEqual(
				fullNameMap,
				new Map([
					['someOtherFullName', new Set(['some/relative/file/path', 'some/relative/file/other'])],
					['someFullName', new Set(['some/relative/file/path'])]
				])
			);
		});
	});

	describe('determineWorkspace()', function () {
		beforeEach(function () {
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
		});

		it('shall determine the workspace', function () {
			assert.strictEqual(AbstractMetadataFactory.determineWorkspace(metadata.relativeFilePath, workspaceMap), 'workspace');
		});

		it('shall not determine the workspace if no valid file path had been passed', function () {
			assert.strictEqual(AbstractMetadataFactory.determineWorkspace('no-valid-file-path', workspaceMap), undefined);
		});
	});

	describe('extractMetadata()', function () {
		beforeEach(function () {
			metadata.fullName = 'someFullName';
			metadata.serviceFullName = 'someServiceFullName';
			metadata.serviceFullNames = ['someServiceFullName'];
		});

		it('shall extract the analytical model metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/analyticalmodel/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.labelTextId = 'someLabelTextId';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/analyticalmodel/metadata.json',
				fullName: 'someFullName',
				labelTextId: 'someLabelTextId',
				name: undefined,
				relativeFilePath: 'workspace/metadata/analyticalmodel/metadata.json',
				serviceFullName: 'someServiceFullName',
				type: 'analyticalmodel',
				workspace: 'workspace'
			});
		});

		it('shall extract the api metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/api/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.entityReference = 'someEntityReference';
			metadata.operations = 'operations';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/api/metadata.json',
				entityReference: 'someEntityReference',
				fullName: 'someFullName',
				name: undefined,
				operations: 'operations',
				relativeFilePath: 'workspace/metadata/api/metadata.json',
				serviceFullName: 'someServiceFullName',
				type: 'api',
				workspace: 'workspace'
			});
		});

		it('shall extract the business object metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/businessobject/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.associations = 'associations';
			metadata.determinations = 'determinations';
			metadata.elements = 'elements';
			metadata.isRoot = 'isRoot';
			metadata.name = 'name';
			metadata.namespace = 'namespace';
			metadata.nodes = 'nodes';
			metadata.validations = 'validations';
			metadata.indices = 'indices';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/businessobject/metadata.json',
				associations: 'associations',
				determinations: 'determinations',
				elements: 'elements',
				fullName: 'namespace/name',
				isRoot: 'isRoot',
				name: 'name',
				namespace: 'namespace',
				nodes: 'nodes',
				relativeFilePath: 'workspace/metadata/businessobject/metadata.json',
				type: 'businessobject',
				validations: 'validations',
				workspace: 'workspace',
				indices: 'indices'
			});
		});

		it('shall extract the data type metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/datatype/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.elements = 'elements';
			metadata.implementationType = 'implementationType';
			metadata.proxyName = 'proxyName';
			metadata.representationTerm = 'representationTerm';
			metadata.name = 'name';
			metadata.namespace = 'namespace';
			metadata.valueRangeSpecification = 'valueRangeSpecification';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/datatype/metadata.json',
				elements: 'elements',
				fullName: 'namespace/name',
				implementationType: 'implementationType',
				name: 'name',
				namespace: 'namespace',
				proxyName: 'proxyName',
				relativeFilePath: 'workspace/metadata/datatype/metadata.json',
				representationTerm: 'representationTerm',
				type: 'datatype',
				valueRangeSpecification: 'valueRangeSpecification',
				workspace: 'workspace'
			});
		});

		it('shall extract the entity metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/entity/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.anchors = 'anchors';
			metadata.attributes = 'attributes';
			metadata.entityType = 'entityType';
			metadata.fullName = 'fullName';
			metadata.labelTextId = 'labelTextId';
			metadata.pluralLabelTextId = 'pluralLabelTextId';
			metadata.valueRangeSpecification = 'valueRangeSpecification';
			metadata.root = 'someRootBooleanValue';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/entity/metadata.json',
				anchors: 'anchors',
				attributes: 'attributes',
				entityType: 'entityType',
				fullName: 'fullName',
				labelTextId: 'labelTextId',
				name: undefined,
				pluralLabelTextId: 'pluralLabelTextId',
				relativeFilePath: 'workspace/metadata/entity/metadata.json',
				serviceFullName: 'someServiceFullName',
				root: 'someRootBooleanValue',
				type: 'entity',
				workspace: 'workspace'
			});
		});

		it('shall extract the entity content metadata', function () {
			metadata.relativeFilePath = 'workspace/content/entity/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.anchors = 'anchors';
			metadata.content = 'content';
			metadata.entityReference = 'entityReference';
			metadata.fullName = 'fullName';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/content/entity/metadata.json',
				anchors: 'anchors',
				content: 'content',
				entityReference: 'entityReference',
				fullName: 'fullName',
				name: undefined,
				relativeFilePath: 'workspace/content/entity/metadata.json',
				serviceFullName: 'someServiceFullName',
				type: 'entitycontent',
				workspace: 'workspace'
			});
		});

		it('shall extract the event metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/event/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.labelTextId = 'labelTextId';
			metadata.entityReference = 'entityReference';
			metadata.eventTopicReference = 'eventTopicReference';
			metadata.fullName = 'fullName';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/event/metadata.json',
				labelTextId: 'labelTextId',
				entityReference: 'entityReference',
				eventTopicReference: 'eventTopicReference',
				fullName: 'fullName',
				name: undefined,
				relativeFilePath: 'workspace/metadata/event/metadata.json',
				serviceFullName: 'someServiceFullName',
				type: 'event',
				workspace: 'workspace'
			});
		});

		it('shall extract the event topic metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/eventtopic/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.fullName = 'fullName';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/eventtopic/metadata.json',
				fullName: 'fullName',
				name: undefined,
				relativeFilePath: 'workspace/metadata/eventtopic/metadata.json',
				serviceFullName: 'someServiceFullName',
				type: 'eventtopic',
				workspace: 'workspace'
			});
		});

		it('shall extract the message group metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/messagegroup/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.fullName = 'fullName';
			metadata.systemMessages = 'systemMessages';
			metadata.errors = 'errors';
			metadata.infos = 'infos';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/messagegroup/metadata.json',
				fullName: 'fullName',
				name: undefined,
				relativeFilePath: 'workspace/metadata/messagegroup/metadata.json',
				serviceFullName: 'someServiceFullName',
				type: 'messagegroup',
				systemMessages: 'systemMessages',
				errors: 'errors',
				infos: 'infos',
				workspace: 'workspace'
			});
		});

		it('shall extract the service metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/service/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.analyticalModels = 'analyticalModels';
			metadata.apis = 'apis';
			metadata.entities = 'entities';
			metadata.events = 'events';
			metadata.eventTopics = 'eventTopics';
			metadata.fullName = 'fullName';
			metadata.tasks = 'tasks';
			metadata.labelTextId = 'labelTextId';
			metadata.uiApps = 'uiApps';
			metadata.uiViews = 'uiViews';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/service/metadata.json',
				analyticalModels: 'analyticalModels',
				apis: 'apis',
				entities: 'entities',
				events: 'events',
				eventTopics: 'eventTopics',
				fullName: 'fullName',
				tasks: 'tasks',
				labelTextId: 'labelTextId',
				name: undefined,
				relativeFilePath: 'workspace/metadata/service/metadata.json',
				serviceFullName: 'fullName',
				type: 'service',
				uiApps: 'uiApps',
				uiViews: 'uiViews',
				workspace: 'workspace'
			});
		});

		it('shall extract the service adaptation metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/serviceadaptation/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.autoExposeElements = 'autoExposeElements';
			metadata.binding = 'binding';
			metadata.elements = 'elements';
			metadata.nodes = 'nodes';
			metadata.fullName = 'fullName';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/serviceadaptation/metadata.json',
				autoExposeElements: 'autoExposeElements',
				binding: 'binding',
				elements: 'elements',
				nodes: 'nodes',
				fullName: 'fullName',
				name: undefined,
				relativeFilePath: 'workspace/metadata/serviceadaptation/metadata.json',
				serviceFullName: 'someServiceFullName',
				type: 'serviceadaptation',
				workspace: 'workspace'
			});
		});

		it('shall extract the text content metadata', function () {
			delete metadata.serviceFullName;
			metadata.relativeFilePath = 'workspace/content/text/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.groups = 'groups';
			metadata.fullName = 'fullName';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/content/text/metadata.json',
				groups: {
					groups: 'groups',
					relativeFilePath: 'workspace/content/text/metadata.json'
				},
				fullNames: ['fullName'],
				name: 'metadata',
				relativeFilePath: 'workspace/content/text/metadata.json',
				serviceFullNames: ['someServiceFullName'],
				type: 'textcontent',
				workspace: 'workspace'
			});
		});

		it('shall extract the common text content metadata', function () {
			delete metadata.serviceFullNames;
			delete metadata.serviceFullName;
			delete metadata.fullName;
			metadata.relativeFilePath = 'workspace/content/text/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.groups = 'groups';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/content/text/metadata.json',
				groups: {
					groups: 'groups',
					relativeFilePath: 'workspace/content/text/metadata.json'
				},
				fullNames: ['sap.crm.common.terminology'],
				name: 'metadata',
				relativeFilePath: 'workspace/content/text/metadata.json',
				serviceFullNames: ['sap.crm.common'],
				type: 'textcontent',
				workspace: 'workspace'
			});
		});

		it('shall extract the ui app metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/uiapp/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.components = 'components';
			metadata.labelTextId = 'labelTextId';
			metadata.fullName = 'fullName';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/uiapp/metadata.json',
				components: 'components',
				labelTextId: 'labelTextId',
				fullName: 'fullName',
				name: undefined,
				relativeFilePath: 'workspace/metadata/uiapp/metadata.json',
				serviceFullName: 'someServiceFullName',
				type: 'uiapp',
				workspace: 'workspace'
			});
		});

		it('shall extract the ui view metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/uiview/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.additionalTexts = 'additionalTexts';
			metadata.anchors = 'anchors';
			metadata.customQueries = 'customQueries';
			metadata.events = 'events';
			metadata.fieldSets = 'fieldSets';
			metadata.labelTextId = 'labelTextId';
			metadata.layouts = 'layouts';
			metadata.navMenu = 'navMenu';
			metadata.fullName = 'fullName';
			metadata.queries = 'queries';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/uiview/metadata.json',
				additionalTexts: 'additionalTexts',
				anchors: 'anchors',
				customQueries: 'customQueries',
				events: 'events',
				labelTextId: 'labelTextId',
				fieldSets: 'fieldSets',
				layouts: 'layouts',
				navMenu: 'navMenu',
				fullName: 'fullName',
				name: undefined,
				relativeFilePath: 'workspace/metadata/uiview/metadata.json',
				serviceFullName: 'someServiceFullName',
				type: 'uiview',
				workspace: 'workspace',
				queries: 'queries'
			});
		});

		it('shall extract the task metadata', function () {
			metadata.relativeFilePath = 'workspace/metadata/task/metadata.json';
			workspaceMap.set(metadata.relativeFilePath, 'workspace');
			metadata.fullName = 'fullName';
			metadata.serviceFullName = 'serviceFullName';
			const extractedMetadata = AbstractMetadataFactory.extractMetadata(metadata.relativeFilePath, metadata, workspaceMap, workspaceRootDirectory);
			assert.deepStrictEqual(extractedMetadata, {
				absoluteFilePath: '/workspaceRootDirectory/workspace/metadata/task/metadata.json',
				fullName: 'fullName',
				name: undefined,
				relativeFilePath: 'workspace/metadata/task/metadata.json',
				serviceFullName: 'serviceFullName',
				type: 'task',
				workspace: 'workspace'
			});
		});
	});
});
