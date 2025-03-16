'use strict';

const rewiremock = require('rewiremock').default;
const assert = require('node:assert');
const { resolve } = require('node:path');
const sinon = require('sinon');

let Task, getWorkspaces, getWorkspacRootDirectory;
let plugin, workspaceRootDirectory, workspaces, files;
let descriptionTextIdFiles, labelTextIdFiles, labelFiles, pluralLabelTextIdFiles, uiappLabelFiles, tree;
let serviceAdaptation;

describe('plugin', function () {
	before(function () {
		this.timeout(0);
		Task = {
			executeSync: sinon.stub()
		};
		getWorkspaces = sinon.stub();
		workspaceRootDirectory = resolve(__dirname, '../../../');
		getWorkspacRootDirectory = sinon.stub().returns(workspaceRootDirectory);

		files = [
			'application/sap-n-some-package/metadata/entity/someEntity.json',
			'application/sap-n-some-package/content/entity/someContentEntity.json',
			'application/sap-n-some-package/metadata/entity/someMetadataEntity.json',
			'application/sap-n-some-package/metadata/uiview/someMetadataUiView.json',
			'application/sap-n-some-package/metadata/mashup/someMetadataMashup.json',
			'application/sap-n-some-package/metadata/metric/someMetadataMetric.json',
			'application/sap-n-some-package/metadata/task/someMetadataTask.json',
			'application/sap-n-some-package/package.json',
			'application/sap-n-some-package/metadata/service/service.json',
			'application/sap-n-some-other-package/metadata/datatype/someOtherDataType.json',
			'some/other/file.metadef.json',
			'application/sap-n-some-package/metadata/datatype/someDataType.json',
			'application/sap-n-some-package/metadata/serviceadaptation/someServiceAdaptation.json',
			'application/sap-n-some-package/metadata/businessobject/someBusinessObject.json',
			'application/sap-n-some-package/metadata/api/account.json',
			'application/sap-n-some-package/content/text/someText.json',
			'application/sap-n-some-package/content/text/someText_en.json',
			'application/sap-n-some-package/content/text/someText_de.json',
			'application/sap-n-common/content/text/someText.json',
			'application/sap-n-common/content/text/someText_en.json',
			'application/sap-n-common/content/text/someText_de.json',
			'application/sap-n-common/content/text/someText2.json',
			'application/sap-n-common/content/text/someText2_en.json',
			'application/sap-n-common/content/text/someText2_de.json',
			'infrastructure/eslint-plugin-elsa/fixtures/metadata/api/account.js'
		].join('\n');
		descriptionTextIdFiles = [
			'application/sap-n-some-package/content/entity/someContentEntity.json: "descriptionTextId": "BusinessPartnerCategoryCode.PERSON"',
			'application/sap-n-some-package/content/entity/someContentEntity.json: "descriptionTextId": "BusinessPartnerCategoryCode.ORGANIZATION"',
			'application/sap-n-some-package/content/entity/someContentEntity.json: "descriptionTextId": "BusinessPartnerCategoryCodeORGANIZATION"',
			'application/sap-n-some-package2/content/entity/someContentEntity.json: "descriptionTextId": "BusinessPartnerCategoryCode.ORGANIZATION"',
			'application/sap-n-some-package2/content/entity/someContentEntity.json "descriptionTextId" "BusinessPartnerCategoryCode.ORGANIZATION"'
		].join('\n');
		labelTextIdFiles = [
			'application/sap-n-some-package/metadata/entity/someMetadataEntity.json: "labelTextId": "sap.crm.common.BusinessPartnerCategoryCode.PERSON"',
			'application/sap-n-some-package/metadata/entity/someMetadataEntity.json: "labelTextId": "sap.crm.common.BusinessPartnerCategoryCode.ORGANIZATION"'
		].join('\n');
		labelFiles = [
			'application/sap-n-some-package/metadata/uiview/someMetadataUiView.json: "labelTextId": "sap.crm.common.BusinessPartnerCategoryCode.PERSON"',
			'application/sap-n-some-package/metadata/uiview/someMetadataUiView.json: "labelTextId": "sap.crm.common.BusinessPartnerCategoryCode.ORGANIZATION"'
		].join('\n');
		pluralLabelTextIdFiles = [].join('\n');
		uiappLabelFiles = [].join('\n');

		tree = [
			'100644 blob 03ea324e8eb8245c528a8b6a410a9452c5de8fb4	application/sap-n-some-package/metadata/entity/someEntity.json',
			'100644 blob 03ea324e8eb8245c528a8b6a410a9452c5de8fb5	application/sap-n-some-package/content/entity/someContentEntity.json',
			'100644 blob 03ea324e8eb8245c528a8b6a410a9452c5de8fb6	application/sap-n-some-package/metadata/entity/someMetadataEntity.json',
			'100644 blob 03ea324e8eb8245c528a8b6a410a9452c5de8fb7	application/sap-n-some-package/metadata/uiview/someMetadataUiView.json',
			'100644 blob c3ea324e8eb8245c528a8b6a410a9452c5de8fb7	application/sap-n-some-package/metadata/mashup/someMetadataMashup.json',
			'100644 blob 13ea324e8eb8245c521a8b6a410a9452c5de8fb1	application/sap-n-some-package/metadata/metric/someMetadataMetric.json',
			'100644 blob c52a324e8eb8245c521a8b6a410a9452c5de8fb1	application/sap-n-some-package/metadata/task/someMetadataTask.json',
			'100644 blob 7eede98c6770c58b09b67e7b4ffe644b63093a15	application/sap-n-some-package/package.json',
			'100644 blob ba6617492c53163bb4106b9ec3af5a4b57cbafde	application/sap-n-some-package/metadata/service/service.json',
			'100644 blob fbd7d3b020a0faebaf41cd97105b7041393267a7	application/sap-n-some-other-package/metadata/datatype/someOtherDataType.json',
			'100644 blob 748cfc33df91d65e08c8e02f6aba7890ca604a0f	some/other/file.metadef.json',
			'100644 blob b5b5d4d0c2c0715de01488c8011384f9b4ca2fc2	application/sap-n-some-package/metadata/datatype/someDataType.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30353	application/sap-n-some-package/metadata/serviceadaptation/someServiceAdaptation.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30393	application/sap-n-some-package/metadata/businessobject/someBusinessObject.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30393	application/sap-n-some-package/metadata/api/account.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30222	application/sap-n-some-package/content/text/someText.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30222	application/sap-n-some-package/content/text/someText_en.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30222	application/sap-n-some-package/content/text/someText_de.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30222	application/sap-n-common/content/text/someText.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30222	application/sap-n-common/content/text/someText_en.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30222	application/sap-n-common/content/text/someText_de.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30222	application/sap-n-common/content/text/someText2.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30222	application/sap-n-common/content/text/someText2_en.json',
			'100644 blob c52cc840d6c3611ccab4c471d67b8f97dad30222	application/sap-n-common/content/text/someText2_de.json',
			'100644 blob c52cc8666666611ccab4c471d67b8f97dad30222	infrastructure/eslint-plugin-elsa/fixtures/metadata/api/account.js'
		].join('\n');

		rewiremock(() => require('@sapn/elsa-util-task')).with(Task);
		rewiremock(() => require('@sapn/elsa-util-workspace/get')).with(getWorkspaces);
		rewiremock(() => require('@sapn/elsa-util-workspace/getRootDirectory')).with(getWorkspacRootDirectory);
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/entity/someEntity.json')).with({
			entityType: 'someEntityType',
			fullName: 'someEntity',
			name: 'someEntity',
			serviceFullName: 'someService',
			attributes: [],
			anchors: []
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/content/entity/someContentEntity.json')).with({
			serviceFullName: 'sap.crm.md.service.businessPartnerService',
			fullName: 'sap.crm.md.businesspartnerservice.entitycontent.formOfAddress',
			entityReference: 'sap.crm.md.businesspartnerservice.entity.formOfAddress',
			anchors: [],
			content: []
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/entity/someMetadataEntity.json')).with({
			entityType: 'someMetadataEntityType',
			fullName: 'someMetadataEntity',
			name: 'someMetadataEntity',
			serviceFullName: 'someService',
			attributes: [],
			anchors: []
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/uiview/someMetadataUiView.json')).with({
			fullName: 'someMetadataUiView',
			name: 'someMetadataUiView',
			serviceFullName: 'someService',
			anchors: []
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/mashup/someMetadataMashup.json')).with({
			id: 'a1f95420-29d8-4fb2-a78c-69919f80e65f',
			displayId: 'SM5033',
			serviceFullName: 'someService',
			mashupComponent: {}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/metric/someMetadataMetric.json')).with({
			fullName: 'sap.crm.eventmanagementservice.metric.event',
			name: 'event',
			serviceFullName: 'someService',
			analyticalModelInfo: {
				name: 'CODTSKEMP',
				fullName: 'sap.crm.eventmanagementservice.analyticalmodel.CODTSKEMP',
				serviceFullName: 'sap.crm.service.eventManagementService'
			}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/datatype/someDataType.json')).with({
			elements: {},
			namespace: '@sapn/some-package',
			implementationType: 'someImplementationType',
			name: 'someDataType',
			proxyName: 'someProxyName',
			representationTerm: 'someRepresentationTerm',
			valueRangeSpecification: {}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/service/service.json')).with({
			fullName: 'someService',
			name: 'someServiceService',
			analyticalModels: [],
			apis: [],
			entities: [],
			events: [],
			eventTopics: []
		});

		serviceAdaptation = {
			fullName: 'someEntity',
			binding: { type: 'BusinessObject' },
			elements: []
		};
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/serviceadaptation/someServiceAdaptation.json')).with(serviceAdaptation);
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/businessobject/someBusinessObject.json')).with({
			namespace: '@sapn/some-package',
			name: 'someBusinessObject',
			associations: {},
			elements: [],
			determinations: [],
			isRoot: true,
			nodes: []
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/task/someMetadataTask.json')).with({
			fullName: 'sap.crm.elsataskservice.task.analyzeCodes',
			implementation: '@sapn/elsa-task/analyzeCodes/AnalyzeCodes',
			eventFullName: 'sap.crm.elsaschedulerservice.event.processTask',
			serviceFullName: 'sap.crm.service.elsaTaskService'
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/metadata/api/account.json')).with({
			fullName: 'someApi',
			serviceFullName: 'someService',
			name: 'account',
			apiPath: '/account-service/accounts',
			entityReference: 'sap.crm.md.accountservice.entity.account',
			operations: []
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/content/text/someText.json')).with({
			serviceFullNames: ['someService'],
			BusinessPartnerCategoryCode: {
				PERSON: {
					value: 'Person'
				},
				ORGANIZATION: {
					value: 'Organization'
				}
			}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/content/text/someText_de.json')).with({
			serviceFullNames: ['someService'],
			BusinessPartnerCategoryCode: {
				PERSON: {
					value: 'Person'
				},
				ORGANIZATION: {
					value: 'Organisation'
				}
			}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-some-package/content/text/someText_en.json')).with({
			serviceFullNames: ['someService'],
			BusinessPartnerCategoryCode: {
				PERSON: {
					value: 'Person'
				},
				ORGANIZATION: {
					value: 'Organization'
				}
			}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-common/content/text/someText.json')).with({
			BusinessPartnerCategoryCode: {
				PERSON: {
					value: 'Person'
				},
				ORGANIZATION: {
					value: 'Organization'
				}
			}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-common/content/text/someText_de.json')).with({
			BusinessPartnerCategoryCode: {
				PERSON: {
					value: 'Person'
				},
				ORGANIZATION: {
					value: 'Organisation'
				}
			}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-common/content/text/someText_en.json')).with({
			BusinessPartnerCategoryCode: {
				PERSON: {
					value: 'Person'
				},
				ORGANIZATION: {
					value: 'Organization'
				}
			}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-common/content/text/someText2.json')).with({
			BusinessPartnerCategoryCode: {
				PERSON: {
					value: 'Person'
				},
				ORGANIZATION: {
					value: 'Organization'
				}
			}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-common/content/text/someText2_de.json')).with({
			BusinessPartnerCategoryCode: {
				PERSON: {
					value: 'Person'
				},
				ORGANIZATION: {
					value: 'Organisation'
				}
			}
		});
		rewiremock(resolve(workspaceRootDirectory, 'application/sap-n-common/content/text/someText2_en.json')).with({
			BusinessPartnerCategoryCode: {
				PERSON: {
					value: 'Person'
				},
				ORGANIZATION: {
					value: 'Organization'
				}
			}
		});

		rewiremock(resolve(workspaceRootDirectory, 'infrastructure/eslint-plugin-elsa/fixtures/metadata/api/account.js')).with({
			fullName: 'someApi',
			serviceFullName: 'someService',
			name: 'account',
			apiPath: '/account-service/accounts',
			entityReference: 'sap.crm.md.accountservice.entity.account',
			operations: []
		});
		rewiremock.enable();
		plugin = require('../src/plugin');
	});

	beforeEach(function () {
		getWorkspaces.reset();
		workspaces = {
			'@sapn/some-package': {
				name: '@sapn/some-package',
				version: '0.8.15',
				private: false,
				location: resolve(__dirname, '../../../application/sap-n-some-package'),
				context: 'application/sap-n-some-package'
			},
			'@sapn/common': {
				name: '@sapn/common',
				version: '0.8.15',
				private: false,
				location: resolve(__dirname, '../../../application/sap-n-common'),
				context: 'application/sap-n-common'
			}
		};
	});

	after(function () {
		rewiremock.disable();
	});

	describe('#getElsaPackageContentTextDefinitions()', function () {
		beforeEach(function () {
			Task.executeSync.reset();
			Task.executeSync.resolves({ code: 0, stdout: '', stderr: '' });

			getWorkspaces.reset();
			getWorkspaces.returns({});
		});

		it('shall throw exception if git ls-tree fails', function () {
			Task.executeSync.withArgs('git ls-files').returns({ code: 1, stdout: '', stderr: 'SomeError' });
			assert.throws(() => plugin.getElsaPackageContentTextDefinitions(), /Runtime Exception: git ls-files failed - SomeError/);
		});

		it('shall create the package content text definitions information', function () {
			Task.executeSync.withArgs('git ls-files').returns({ code: 0, stdout: files });
			getWorkspaces.returns(workspaces);
			assert.deepStrictEqual(plugin.getElsaPackageContentTextDefinitions(), {
				'sap-n-common': {
					BusinessPartnerCategoryCode: {
						ORGANIZATION: {
							definitions: [
								{
									textFile: 'application/sap-n-common/content/text/someText.json',
									value: 'Organization'
								},
								{
									textFile: 'application/sap-n-common/content/text/someText2.json',
									value: 'Organization'
								}
							]
						},
						PERSON: {
							definitions: [
								{
									textFile: 'application/sap-n-common/content/text/someText.json',
									value: 'Person'
								},
								{
									textFile: 'application/sap-n-common/content/text/someText2.json',
									value: 'Person'
								}
							]
						}
					}
				},
				'sap-n-some-package': {
					BusinessPartnerCategoryCode: {
						ORGANIZATION: {
							definitions: [
								{
									textFile: 'application/sap-n-some-package/content/text/someText.json',
									value: 'Organization'
								}
							]
						},
						PERSON: {
							definitions: [
								{
									textFile: 'application/sap-n-some-package/content/text/someText.json',
									value: 'Person'
								}
							]
						}
					}
				}
			});
		});
	});

	describe('#getElsaPackageContentTextDefinitionsAndUsages()', function () {
		beforeEach(function () {
			Task.executeSync.reset();
			Task.executeSync.resolves({ code: 0, stdout: '', stderr: '' });

			getWorkspaces.reset();
			getWorkspaces.returns({});
		});

		it('shall throw exception if git ls-tree fails', function () {
			Task.executeSync.withArgs('git ls-files').returns({ code: 1, stdout: '', stderr: 'SomeError' });
			assert.throws(() => plugin.getElsaPackageContentTextDefinitionsAndUsages(), /Runtime Exception: git ls-files failed - SomeError/);
		});

		it('shall throw exception if grep fails', function () {
			Task.executeSync.withArgs('git ls-files').returns({ code: 0, stdout: files });
			getWorkspaces.returns(workspaces);
			Task.executeSync.withArgs('grep descriptionTextId application/*/content/entity/*.json').returns({
				code: 1,
				stdout: '',
				stderr: 'SomeError'
			});
			Task.executeSync.withArgs('grep labelTextId application/*/metadata/entity/*.json').returns({
				code: 1,
				stdout: '',
				stderr: 'SomeError'
			});
			Task.executeSync.withArgs('grep label application/*/metadata/uiview/*.json').returns({
				code: 1,
				stdout: '',
				stderr: 'SomeError'
			});
			Task.executeSync.withArgs('grep pluralLabelTextId application/*/metadata/entity/*.json').returns({
				code: 1,
				stdout: 'SomeError'
			});
			Task.executeSync.withArgs('grep label application/*/metadata/uiapp/*.json').returns({
				code: 1,
				stdout: 'SomeError'
			});
			assert.throws(() => plugin.getElsaPackageContentTextDefinitionsAndUsages(), /Runtime Exception: grep failed - SomeError/);
		});

		it('shall create the package content text definitions and usages information', function () {
			Task.executeSync.withArgs('git ls-files').returns({ code: 0, stdout: files });
			getWorkspaces.returns(workspaces);
			Task.executeSync.withArgs('grep descriptionTextId application/*/content/entity/*.json').returns({
				code: 0,
				stdout: descriptionTextIdFiles
			});
			Task.executeSync.withArgs('grep labelTextId application/*/metadata/entity/*.json').returns({
				code: 0,
				stdout: labelTextIdFiles
			});
			Task.executeSync.withArgs('grep label application/*/metadata/uiview/*.json').returns({
				code: 0,
				stdout: labelFiles
			});
			Task.executeSync.withArgs('grep pluralLabelTextId application/*/metadata/entity/*.json').returns({
				code: 0,
				stdout: pluralLabelTextIdFiles
			});
			Task.executeSync.withArgs('grep label application/*/metadata/uiapp/*.json').returns({
				code: 0,
				stdout: uiappLabelFiles
			});
			assert.deepStrictEqual(plugin.getElsaPackageContentTextDefinitionsAndUsages(), {
				'sap-n-common': {
					BusinessPartnerCategoryCode: {
						ORGANIZATION: {
							definitions: [
								{
									textFile: 'application/sap-n-common/content/text/someText.json',
									value: 'Organization'
								},
								{
									textFile: 'application/sap-n-common/content/text/someText2.json',
									value: 'Organization'
								}
							],
							usages: [
								{
									reference: '"labelTextId": "sap.crm.common.BusinessPartnerCategoryCode.ORGANIZATION"',
									referencedFile: 'application/sap-n-some-package/metadata/entity/someMetadataEntity.json'
								},
								{
									reference: '"labelTextId": "sap.crm.common.BusinessPartnerCategoryCode.ORGANIZATION"',
									referencedFile: 'application/sap-n-some-package/metadata/uiview/someMetadataUiView.json'
								}
							]
						},
						PERSON: {
							definitions: [
								{
									textFile: 'application/sap-n-common/content/text/someText.json',
									value: 'Person'
								},
								{
									textFile: 'application/sap-n-common/content/text/someText2.json',
									value: 'Person'
								}
							],
							usages: [
								{
									reference: '"labelTextId": "sap.crm.common.BusinessPartnerCategoryCode.PERSON"',
									referencedFile: 'application/sap-n-some-package/metadata/entity/someMetadataEntity.json'
								},
								{
									reference: '"labelTextId": "sap.crm.common.BusinessPartnerCategoryCode.PERSON"',
									referencedFile: 'application/sap-n-some-package/metadata/uiview/someMetadataUiView.json'
								}
							]
						}
					}
				},
				'sap-n-some-package': {
					BusinessPartnerCategoryCode: {
						ORGANIZATION: {
							definitions: [
								{
									textFile: 'application/sap-n-some-package/content/text/someText.json',
									value: 'Organization'
								}
							],
							usages: [
								{
									reference: '"descriptionTextId": "BusinessPartnerCategoryCode.ORGANIZATION"',
									referencedFile: 'application/sap-n-some-package/content/entity/someContentEntity.json'
								}
							]
						},
						PERSON: {
							definitions: [
								{
									textFile: 'application/sap-n-some-package/content/text/someText.json',
									value: 'Person'
								}
							],
							usages: [
								{
									reference: '"descriptionTextId": "BusinessPartnerCategoryCode.PERSON"',
									referencedFile: 'application/sap-n-some-package/content/entity/someContentEntity.json'
								}
							]
						}
					}
				}
			});
		});
	});

	describe('#getElsaPackageContent()', function () {
		beforeEach(function () {
			Task.executeSync.reset();
			Task.executeSync.resolves({ code: 0, stdout: '', stderr: '' });

			getWorkspaces.reset();
			getWorkspaces.returns({});
		});

		it('shall throw exception if there ig git ls-tree fails', function () {
			Task.executeSync.withArgs('git ls-files').returns({ code: 1, stdout: '', stderr: 'SomeError' });
			assert.throws(() => plugin.getElsaPackageContent(), /Runtime Exception: git ls-files failed - SomeError/);
		});

		it('shall create the package content information', function () {
			Task.executeSync.withArgs('git ls-files').returns({ code: 0, stdout: files });
			getWorkspaces.returns(workspaces);
			assert.deepStrictEqual(plugin.getElsaPackageContent(), {
				'application/sap-n-some-package/content/entity/someContentEntity.json': {
					anchors: [],
					content: [],
					entityReference: 'sap.crm.md.businesspartnerservice.entity.formOfAddress',
					fullName: 'sap.crm.md.businesspartnerservice.entitycontent.formOfAddress',
					package: '@sapn/some-package',
					serviceFullName: 'sap.crm.md.service.businessPartnerService',
					type: 'entity'
				}
			});
		});
	});

	describe('#getElsaPackageMetadata()', function () {
		beforeEach(function () {
			Task.executeSync.reset();
			Task.executeSync.resolves({ code: 0, stdout: '', stderr: '' });

			getWorkspaces.reset();
			getWorkspaces.returns({});
		});

		it('shall throw exception if there ig git ls-tree fails', function () {
			Task.executeSync.withArgs('git ls-files').returns({ code: 1, stdout: '', stderr: 'SomeError' });
			assert.throws(() => plugin.getElsaPackageMetadata(), /Runtime Exception: git ls-files failed - SomeError/);
		});

		it('shall create the package metadata information', function () {
			Task.executeSync.withArgs('git ls-files').returns({ code: 0, stdout: files });
			getWorkspaces.returns(workspaces);
			assert.deepStrictEqual(plugin.getElsaPackageMetadata(), {
				'application/sap-n-some-package/metadata/datatype/someDataType.json': {
					elements: {},
					fullName: '@sapn/some-package/someDataType',
					implementationType: 'someImplementationType',
					name: 'someDataType',
					namespace: '@sapn/some-package',
					package: '@sapn/some-package',
					proxyName: 'someProxyName',
					representationTerm: 'someRepresentationTerm',
					type: 'datatype',
					valueRangeSpecification: {}
				},
				'application/sap-n-some-package/metadata/entity/someEntity.json': {
					entityType: 'someEntityType',
					fullName: 'someEntity',
					name: 'someEntity',
					package: '@sapn/some-package',
					serviceFullName: 'someService',
					type: 'entity',
					attributes: [],
					anchors: []
				},
				'application/sap-n-some-package/metadata/entity/someMetadataEntity.json': {
					entityType: 'someMetadataEntityType',
					fullName: 'someMetadataEntity',
					name: 'someMetadataEntity',
					package: '@sapn/some-package',
					serviceFullName: 'someService',
					type: 'entity',
					attributes: [],
					anchors: []
				},
				'application/sap-n-some-package/metadata/uiview/someMetadataUiView.json': {
					fullName: 'someMetadataUiView',
					name: 'someMetadataUiView',
					package: '@sapn/some-package',
					serviceFullName: 'someService',
					type: 'uiview',
					anchors: []
				},
				'application/sap-n-some-package/metadata/service/service.json': {
					fullName: 'someService',
					name: 'someServiceService',
					package: '@sapn/some-package',
					serviceFullName: 'someService',
					type: 'service',
					analyticalModels: [],
					apis: [],
					entities: [],
					events: [],
					eventTopics: []
				},
				'application/sap-n-some-package/metadata/serviceadaptation/someServiceAdaptation.json': {
					binding: {
						type: 'BusinessObject'
					},
					fullName: 'someEntity',
					elements: [],
					package: '@sapn/some-package',
					type: 'serviceadaptation'
				},
				'application/sap-n-some-package/metadata/businessobject/someBusinessObject.json': {
					fullName: '@sapn/some-package/someBusinessObject',
					isRoot: true,
					name: 'someBusinessObject',
					namespace: '@sapn/some-package',
					nodes: [],
					package: '@sapn/some-package',
					type: 'businessobject',
					associations: {},
					elements: [],
					determinations: []
				},
				'application/sap-n-some-package/metadata/api/account.json': {
					fullName: 'someApi',
					name: 'account',
					operations: [],
					package: '@sapn/some-package',
					type: 'api',
					serviceFullName: 'someService',
					entityReference: 'sap.crm.md.accountservice.entity.account'
				}
			});
		});
	});

	describe('#getElsaProvisioningMetadata()', function () {
		beforeEach(function () {
			Task.executeSync.reset();
			Task.executeSync.returns({ code: 0, stdout: '', stderr: '' });

			getWorkspaces.reset();
			getWorkspaces.returns({});
		});

		it('shall throw exception if there ig git ls-tree fails', function () {
			Task.executeSync.withArgs('git ls-tree -r HEAD').returns({ code: 1, stdout: '', stderr: 'SomeError' });
			assert.throws(() => plugin.getElsaProvisioningMetadata(), /Runtime Exception: git ls-tree failed - SomeError/);
		});

		it('shall create the provisioning metadata information', function () {
			Task.executeSync.withArgs('git ls-tree -r HEAD').returns({ code: 0, stdout: tree });
			getWorkspaces.returns(workspaces);
			assert.deepStrictEqual(plugin.getElsaProvisioningMetadata(), {
				someService: {
					someApi: 'c52cc840d6c3611ccab4c471d67b8f97dad30393',
					someEntity: '03ea324e8eb8245c528a8b6a410a9452c5de8fb4',
					someMetadataEntity: '03ea324e8eb8245c528a8b6a410a9452c5de8fb6',
					someMetadataUiView: '03ea324e8eb8245c528a8b6a410a9452c5de8fb7',
					someService: 'ba6617492c53163bb4106b9ec3af5a4b57cbafde',
					'@sapn/some-package/someMetadataMashup.json': 'c3ea324e8eb8245c528a8b6a410a9452c5de8fb7',
					'sap.crm.eventmanagementservice.metric.event': '13ea324e8eb8245c521a8b6a410a9452c5de8fb1'
				}
			});
		});
	});

	describe('#getElsaProvisioningLock()', function () {
		beforeEach(function () {
			Task.executeSync.reset();
			Task.executeSync.returns({ code: 0, stdout: '', stderr: '' });

			getWorkspaces.reset();
			getWorkspaces.returns({});
		});

		it('shall throw exception if git ls-tree fails', function () {
			Task.executeSync.withArgs('git ls-tree -r HEAD').returns({ code: 1, stdout: '', stderr: 'SomeError' });
			assert.throws(() => plugin.getElsaProvisioningLock(), /Runtime Exception: git ls-tree failed - SomeError/);
		});

		it('shall create the provisioning lock', function () {
			Task.executeSync.withArgs('git ls-tree -r HEAD').returns({ code: 0, stdout: tree });
			getWorkspaces.returns(workspaces);
			assert.deepStrictEqual(plugin.getElsaProvisioningLock(), {
				someService: {
					entity: {
						someEntity: '03ea324e8eb8245c528a8b6a410a9452c5de8fb4',
						someMetadataEntity: '03ea324e8eb8245c528a8b6a410a9452c5de8fb6'
					},
					mashup: {
						'@sapn/some-package/someMetadataMashup.json': 'c3ea324e8eb8245c528a8b6a410a9452c5de8fb7'
					},
					metric: {
						'sap.crm.eventmanagementservice.metric.event': '13ea324e8eb8245c521a8b6a410a9452c5de8fb1'
					},
					uiview: {
						someMetadataUiView: '03ea324e8eb8245c528a8b6a410a9452c5de8fb7'
					},
					service: {
						someService: 'ba6617492c53163bb4106b9ec3af5a4b57cbafde'
					},
					api: {
						someApi: 'c52cc840d6c3611ccab4c471d67b8f97dad30393'
					},
					serviceadaptation: {
						someEntity: 'c52cc840d6c3611ccab4c471d67b8f97dad30353'
					},
					text: {
						'@sapn/some-package/someText.json': 'c52cc840d6c3611ccab4c471d67b8f97dad30222',
						'@sapn/some-package/someText_en.json': 'c52cc840d6c3611ccab4c471d67b8f97dad30222',
						'@sapn/some-package/someText_de.json': 'c52cc840d6c3611ccab4c471d67b8f97dad30222'
					}
				},
				'sap.crm.md.service.businessPartnerService': {
					entitycontent: {
						'sap.crm.md.businesspartnerservice.entitycontent.formOfAddress': '03ea324e8eb8245c528a8b6a410a9452c5de8fb5'
					}
				},
				'sap.crm.service.elsaTaskService': {
					task: {
						'sap.crm.elsataskservice.task.analyzeCodes': 'c52a324e8eb8245c521a8b6a410a9452c5de8fb1'
					}
				},
				'sap.crm.common': {
					text: {
						'@sapn/common/someText.json': 'c52cc840d6c3611ccab4c471d67b8f97dad30222',
						'@sapn/common/someText_en.json': 'c52cc840d6c3611ccab4c471d67b8f97dad30222',
						'@sapn/common/someText_de.json': 'c52cc840d6c3611ccab4c471d67b8f97dad30222',
						'@sapn/common/someText2.json': 'c52cc840d6c3611ccab4c471d67b8f97dad30222',
						'@sapn/common/someText2_en.json': 'c52cc840d6c3611ccab4c471d67b8f97dad30222',
						'@sapn/common/someText2_de.json': 'c52cc840d6c3611ccab4c471d67b8f97dad30222'
					}
				}
			});
		});

		it('shall not crash if there are no elsa packages', function () {
			Task.executeSync.withArgs('git ls-tree -r HEAD').returns({ code: 0, stdout: 'bla\n  oops' });
			getWorkspaces.returns(workspaces);
			assert.deepStrictEqual(plugin.getElsaProvisioningLock(), {});
		});

		it('shall not crash if serviceAdaptation points to unknown entity', function () {
			Task.executeSync.withArgs('git ls-tree -r HEAD').returns({ code: 0, stdout: tree });
			getWorkspaces.returns(workspaces);
			serviceAdaptation.fullName = 'i_do_not_exist';

			plugin.getElsaProvisioningLock();
		});
	});

	describe('#createContentMaps()', function () {
		it('shall crete content maps', function () {
			const packageContentLog = {
				file: { type: 'entity', fullName: 'fullName' }
			};

			const absoluteFilePathContentMap = new Map([
				[
					resolve(workspaceRootDirectory, 'file'),
					{
						type: 'entity',
						fullName: 'fullName'
					}
				]
			]);

			const fullNameContentMap = new Map([
				[
					'fullName',
					{
						type: 'entity',
						fullName: 'fullName',
						relativeFilePath: 'file',
						absoluteFilePath: resolve(workspaceRootDirectory, 'file')
					}
				]
			]);

			assert.deepStrictEqual(plugin.createContentMaps(packageContentLog), {
				absoluteFilePathContentMap,
				fullNameContentMap
			});
		});
	});

	describe('#createMetadataMaps()', function () {
		it('shall crete metadata maps', function () {
			const packageMetadataLog = {
				file1: { type: 'businessobject', fullName: 'fullName1' },
				file2: { type: 'serviceadaptation', fullName: 'fullName2' },
				file3: { type: 'datatype', fullName: 'fullName3', proxyName: 'proxyName' },
				file4: { type: 'entity', fullName: 'fullName4' },
				file5: { type: 'uiview', fullName: 'fullName5', anchors: [{ id: 'id' }] }
			};

			const absoluteFilePathMetadataMap = new Map([
				[resolve(workspaceRootDirectory, 'file1'), { type: 'businessobject', fullName: 'fullName1' }],
				[resolve(workspaceRootDirectory, 'file2'), { type: 'serviceadaptation', fullName: 'fullName2' }],
				[
					resolve(workspaceRootDirectory, 'file3'),
					{
						type: 'datatype',
						fullName: 'fullName3',
						proxyName: 'proxyName'
					}
				],
				[resolve(workspaceRootDirectory, 'file4'), { type: 'entity', fullName: 'fullName4' }],
				[
					resolve(workspaceRootDirectory, 'file5'),
					{
						type: 'uiview',
						fullName: 'fullName5',
						anchors: [{ id: 'id' }]
					}
				]
			]);

			const anchorUsagesMap = new Map([['id', ['file5']]]);

			const dataTypeProxyNameUsagesMap = new Map([['proxyName', ['file3']]]);

			const fullNameMetadataMap = new Map([
				[
					'fullName1',
					{
						type: 'businessobject',
						fullName: 'fullName1',
						relativeFilePath: 'file1',
						absoluteFilePath: resolve(workspaceRootDirectory, 'file1')
					}
				],
				[
					'fullName3',
					{
						type: 'datatype',
						fullName: 'fullName3',
						proxyName: 'proxyName',
						relativeFilePath: 'file3',
						absoluteFilePath: resolve(workspaceRootDirectory, 'file3')
					}
				],
				[
					'fullName4',
					{
						type: 'entity',
						fullName: 'fullName4',
						relativeFilePath: 'file4',
						absoluteFilePath: resolve(workspaceRootDirectory, 'file4')
					}
				],
				[
					'fullName5',
					{
						type: 'uiview',
						fullName: 'fullName5',
						anchors: [{ id: 'id' }],
						relativeFilePath: 'file5',
						absoluteFilePath: resolve(workspaceRootDirectory, 'file5')
					}
				]
			]);

			const serviceAdaptationMetadataMap = new Map([
				[
					'fullName2',
					{
						type: 'serviceadaptation',
						fullName: 'fullName2',
						relativeFilePath: 'file2',
						absoluteFilePath: resolve(workspaceRootDirectory, 'file2')
					}
				]
			]);

			assert.deepStrictEqual(plugin.createMetadataMaps(packageMetadataLog), {
				absoluteFilePathMetadataMap,
				anchorUsagesMap,
				dataTypeProxyNameUsagesMap,
				fullNameMetadataMap,
				serviceAdaptationMetadataMap
			});
		});
	});

	describe('#extractMetadataPackageFileContent()', function () {
		it('shall extract metadata entity package file content', function () {
			const packageMetadataLog = {};
			const elsaPackages = [
				{
					relativeLocation: 'application/sap-n-organizational-unit',
					name: '@sapn/organizational-unit'
				}
			];
			plugin.extractMetadataPackageFileContent('application/sap-n-organizational-unit/metadata/entity/organizationalUnit.json', packageMetadataLog, elsaPackages, {
				root: true,
				name: 'organizationalUnit',
				fullName: 'sap.crm.md.organizationalunitservice.entity.organizationalUnit',
				serviceFullName: 'sap.crm.md.service.organizationalUnitService',
				objectTypeCode: '2174',
				entityType: 'BUSINESS',
				labelTextId: 'sap.crm.common.organizationalUnitService.organizationalUnit',
				creatable: true,
				updatable: true,
				deletable: false,
				searchPrimaryIndex: true,
				attributes: [
					{
						name: 'id',
						dataType: 'STRING',
						dataFormat: 'UUID',
						labelTextId: 'sap.crm.common.commonText.id',
						creatable: true,
						updatable: false
					}
				]
			});
			assert.deepStrictEqual(packageMetadataLog, {
				'application/sap-n-organizational-unit/metadata/entity/organizationalUnit.json': {
					entityType: 'BUSINESS',
					attributes: [
						{
							creatable: true,
							dataFormat: 'UUID',
							dataType: 'STRING',
							labelTextId: 'sap.crm.common.commonText.id',
							name: 'id',
							updatable: false
						}
					],
					anchors: undefined,
					fullName: 'sap.crm.md.organizationalunitservice.entity.organizationalUnit',
					name: 'organizationalUnit',
					package: '@sapn/organizational-unit',
					serviceFullName: 'sap.crm.md.service.organizationalUnitService',
					type: 'entity'
				}
			});
		});

		it('shall extract metadata entity package file content only once', function () {
			const packageMetadataLog = { 'application/sap-n-organizational-unit/metadata/entity/organizationalUnit.json': {} };
			const elsaPackages = [
				{
					relativeLocation: 'application/sap-n-organizational-unit',
					name: '@sapn/organizational-unit'
				}
			];
			plugin.extractMetadataPackageFileContent('application/sap-n-organizational-unit/metadata/entity/organizationalUnit.json', packageMetadataLog, elsaPackages, {
				root: true,
				name: 'organizationalUnit',
				fullName: 'sap.crm.md.organizationalunitservice.entity.organizationalUnit',
				serviceFullName: 'sap.crm.md.service.organizationalUnitService',
				objectTypeCode: '2174',
				entityType: 'BUSINESS',
				labelTextId: 'sap.crm.common.organizationalUnitService.organizationalUnit',
				creatable: true,
				updatable: true,
				deletable: false,
				searchPrimaryIndex: true,
				attributes: [
					{
						name: 'id',
						dataType: 'STRING',
						dataFormat: 'UUID',
						labelTextId: 'sap.crm.common.commonText.id',
						creatable: true,
						updatable: false
					}
				]
			});
			assert.deepStrictEqual(packageMetadataLog, {
				'application/sap-n-organizational-unit/metadata/entity/organizationalUnit.json': {}
			});
		});
	});

	describe('#getManifestApplicationLock()', function () {
		beforeEach(function () {
			const gitlsfiles = 'agentConsoleApp.json\nc4cApp.json\ncrmApp.json\ndevelopmentApp.json\ndvpApp.json\ndynamicvisitplanning-addon.json';
			Task.executeSync.reset();
			Task.executeSync.withArgs('git ls-files').returns({ code: 0, stdout: gitlsfiles, stderr: '' });
		});

		it('shall throw exception if git ls-files fails - STC4CMSREPO-1008', function () {
			Task.executeSync.withArgs('git ls-files').returns({ code: 1, stdout: '', stderr: 'SomeError' });
			assert.throws(() => plugin.getManifestApplicationLock(), /Runtime Exception: git ls-files failed - SomeError/);
		});

		it('shall throw exception if git rev-list fails - STC4CMSREPO-1008', function () {
			Task.executeSync.withArgs('git rev-list --all -1', ['agentConsoleApp.json']).returns({
				code: 1,
				stdout: '',
				stderr: 'SomeError'
			});
			assert.throws(() => plugin.getManifestApplicationLock(), /Runtime Exception: git rev-list --all -1 agentConsoleApp.json failed - SomeError/);
		});

		it('shall throw exception if second git rev-list fails - STC4CMSREPO-1008', function () {
			Task.executeSync.withArgs('git rev-list --all -1', ['agentConsoleApp.json']).returns({
				code: 0,
				stdout: 'f563c1a992bf1fac42e410747d22aaf40aa1ca4d',
				stderr: ''
			});
			Task.executeSync.withArgs('git rev-list --all -1', ['c4cApp.json']).returns({
				code: 1,
				stdout: '',
				stderr: 'SomeError'
			});
			assert.throws(() => plugin.getManifestApplicationLock(), /Runtime Exception: git rev-list --all -1 c4cApp.json failed - SomeError/);
		});

		it('shall return a JSON object with filenames and commitIds - STC4CMSREPO-1008', function () {
			Task.executeSync.withArgs('git rev-list --all -1', ['agentConsoleApp.json']).returns({
				code: 0,
				stdout: 'f563c1a992bf1fac42e410747d22aaf40aa1ca4d',
				stderr: ''
			});
			Task.executeSync.withArgs('git rev-list --all -1', ['c4cApp.json']).returns({
				code: 0,
				stdout: 'a9eae1b9c144afb2fe04a55f8b5884f496f27485',
				stderr: ''
			});
			Task.executeSync.withArgs('git rev-list --all -1', ['crmApp.json']).returns({
				code: 0,
				stdout: 'a9eae1b9c144afb2fe04a55f8b5884f496f27485',
				stderr: ''
			});
			Task.executeSync.withArgs('git rev-list --all -1', ['developmentApp.json']).returns({
				code: 0,
				stdout: 'abb6361d2cff6dde01fa026f3327ded179fc6467',
				stderr: ''
			});
			Task.executeSync.withArgs('git rev-list --all -1', ['dvpApp.json']).returns({
				code: 0,
				stdout: 'a35f7ec26520ebc7bc0674b2bcd70fa09943e652',
				stderr: ''
			});
			Task.executeSync
				.withArgs('git rev-list --all -1', ['dynamicvisitplanning-addon.json'])
				.returns({ code: 0, stdout: '6c94fda23a3e867ab13a27a6031554b0b1f47e36', stderr: '' });

			assert.deepStrictEqual(plugin.getManifestApplicationLock(), {
				'agentConsoleApp.json': {
					commitId: 'f563c1a992bf1fac42e410747d22aaf40aa1ca4d'
				},
				'c4cApp.json': {
					commitId: 'a9eae1b9c144afb2fe04a55f8b5884f496f27485'
				},
				'crmApp.json': {
					commitId: 'a9eae1b9c144afb2fe04a55f8b5884f496f27485'
				},
				'developmentApp.json': {
					commitId: 'abb6361d2cff6dde01fa026f3327ded179fc6467'
				},
				'dvpApp.json': {
					commitId: 'a35f7ec26520ebc7bc0674b2bcd70fa09943e652'
				},
				'dynamicvisitplanning-addon.json': {
					commitId: '6c94fda23a3e867ab13a27a6031554b0b1f47e36'
				}
			});
		});
	});
});
