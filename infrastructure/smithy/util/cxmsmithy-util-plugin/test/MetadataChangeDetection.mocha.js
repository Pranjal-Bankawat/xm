'use strict';
const assert = require('node:assert');
const sinon = require('sinon');
const rewiremock = require('rewiremock/node');

describe('MetadataChangeDetection', function () {
	let utilTaskMock, utilWorkspaceGetRootDirectoryMock;
	let MetadataChangeDetection;

	const workspaceRoot = '/root';

	before(function () {
		this.timeout(0);
		utilTaskMock = { executeSync: sinon.stub() };
		utilWorkspaceGetRootDirectoryMock = sinon.stub();

		rewiremock('@sapn/elsa-util-task').with(utilTaskMock);
		rewiremock('@sapn/elsa-util-workspace/getRootDirectory').with(utilWorkspaceGetRootDirectoryMock);
		rewiremock.enable();
		MetadataChangeDetection = require('../src/MetadataChangeDetection');
	});

	after(function () {
		rewiremock.disable();
	});

	beforeEach(function () {
		utilTaskMock.executeSync.resetHistory();
		utilWorkspaceGetRootDirectoryMock.resetHistory();

		utilWorkspaceGetRootDirectoryMock.returns(workspaceRoot);
	});

	describe('#findFirstAncestorWithMetadataChange', function () {
		it('shall throw when no ancestor refs can be found', function () {
			utilTaskMock.executeSync.withArgs('git rev-list --ancestry-path HEAD~500...HEAD').returns({ code: 0, stdout: '' });
			assert.throws(
				() => {
					MetadataChangeDetection.findFirstAncestorWithMetadataChange();
				},
				{ message: 'Runtime Exception: Could not find a metadata change in 500 ancestor refs' }
			);
		});

		it('shall throw when ancestors do not contain metadata file change', function () {
			utilTaskMock.executeSync.withArgs('git rev-list --ancestry-path HEAD~500...HEAD').returns({ code: 0, stdout: '420\n0815' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 420 -r')
				.returns({ code: 0, stdout: 'application/sap-n-account/src/exit.js\napplication/sap-n-account/test/exit.mocha.js' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 0815 -r')
				.returns({ code: 0, stdout: 'application/sap-n-organizational-unit/src/exit.js\napplication/sap-n-organizational-unit/test/exit.mocha.js' });

			assert.throws(
				() => {
					MetadataChangeDetection.findFirstAncestorWithMetadataChange();
				},
				{ message: 'Runtime Exception: Could not find a metadata change in 500 ancestor refs' }
			);
		});

		it('shall return the first ref found with a metadata change', function () {
			utilTaskMock.executeSync.withArgs('git rev-list --ancestry-path HEAD~500...HEAD').returns({ code: 0, stdout: '420\n0815' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 420 -r')
				.returns({ code: 0, stdout: 'application/sap-n-account/src/exit.js\napplication/sap-n-account/test/exit.mocha.js' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 0815 -r')
				.returns({
					code: 0,
					stdout: 'application/sap-n-organizational-unit/src/exit.js\napplication/sap-n-organizational-unit/test/exit.mocha.js\napplication/sap-n-task/metadata/task/redeployCodeContent.json'
				});

			const refWithMetadataChange = MetadataChangeDetection.findFirstAncestorWithMetadataChange();
			assert.strictEqual(refWithMetadataChange, '0815');
		});

		it('shall return the first ref found with a metadata change with HEAD a start ref', function () {
			utilTaskMock.executeSync.withArgs('git rev-list --ancestry-path HEAD~500...HEAD').returns({ code: 0, stdout: '420\n0815' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 420 -r')
				.returns({ code: 0, stdout: 'application/sap-n-account/src/exit.js\napplication/sap-n-account/test/exit.mocha.js' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 0815 -r')
				.returns({
					code: 0,
					stdout: 'application/sap-n-organizational-unit/src/exit.js\napplication/sap-n-organizational-unit/test/exit.mocha.js\napplication/sap-n-task/metadata/task/redeployCodeContent.json'
				});

			const refWithMetadataChange = MetadataChangeDetection.findFirstAncestorWithMetadataChange('HEAD');
			assert.strictEqual(refWithMetadataChange, '0815');
		});

		it('shall throw when git rev-list fails', function () {
			utilTaskMock.executeSync.withArgs('git rev-list --ancestry-path HEAD~500...HEAD').returns({ code: 1, stdout: '' });
			assert.throws(
				() => {
					MetadataChangeDetection.findFirstAncestorWithMetadataChange('HEAD');
				},
				{ message: 'Runtime Exception: failed to get git ancestry refs for endRef: HEAD and startRef: HEAD\nundefined' }
			);
		});

		it('shall throw when git diff-tree fails', function () {
			utilTaskMock.executeSync.withArgs('git rev-list --ancestry-path HEAD~500...HEAD').returns({ code: 0, stdout: '420\n0815' });
			utilTaskMock.executeSync.withArgs('git diff-tree --no-commit-id --name-only 420 -r').returns({ code: 1, stdout: '' });

			assert.throws(
				() => {
					MetadataChangeDetection.findFirstAncestorWithMetadataChange('HEAD');
				},
				{ message: 'Runtime Exception: git list files for ref 420 failed\nundefined' }
			);
		});
	});

	describe('#findRefsWithMetadataChanges', function () {
		it('shall list all refs with metadata changes in an ancestry path', function () {
			utilTaskMock.executeSync.withArgs('git rev-list --ancestry-path 4711...HEAD').returns({ code: 0, stdout: '420\n0815\n4711' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 420 -r')
				.returns({ code: 0, stdout: 'application/sap-n-address/src/exit.js\napplication/sap-n-address/test/exit.mocha.js' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 0815 -r')
				.returns({
					code: 0,
					stdout: 'application/sap-n-account/src/exit.js\napplication/sap-n-account/test/exit.mocha.js\napplication/sap-n-account/metadata/api/account.json'
				});
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 4711 -r')
				.returns({
					code: 0,
					stdout: 'application/sap-n-organizational-unit/src/exit.js\napplication/sap-n-organizational-unit/test/exit.mocha.js\napplication/sap-n-task/metadata/task/redeployCodeContent.json'
				});

			const refsWithMetadataChanges = MetadataChangeDetection.findRefsWithMetadataChanges('4711');
			assert.deepStrictEqual(refsWithMetadataChanges, { refsWithMetadataChanges: ['0815', '4711'] });
		});

		it('shall return empty list when no ancestor refs can be found', function () {
			utilTaskMock.executeSync.withArgs('git rev-list --ancestry-path 4711...HEAD').returns({ code: 0, stdout: '' });

			const refsWithMetadataChanges = MetadataChangeDetection.findRefsWithMetadataChanges('4711');
			assert.deepStrictEqual(refsWithMetadataChanges, { refsWithMetadataChanges: [] });
		});

		it('shall return empty list when no metadata change is found in ancestor refs', function () {
			utilTaskMock.executeSync.withArgs('git rev-list --ancestry-path 4711...HEAD').returns({ code: 0, stdout: '420\n0815\n4711' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 420 -r')
				.returns({ code: 0, stdout: 'application/sap-n-address/src/exit.js\napplication/sap-n-address/test/exit.mocha.js' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 0815 -r')
				.returns({ code: 0, stdout: 'application/sap-n-account/src/exit.js\napplication/sap-n-account/test/exit.mocha.js' });
			utilTaskMock.executeSync
				.withArgs('git diff-tree --no-commit-id --name-only 4711 -r')
				.returns({ code: 0, stdout: 'application/sap-n-organizational-unit/src/exit.js\napplication/sap-n-organizational-unit/test/exit.mocha.js' });

			const refsWithMetadataChanges = MetadataChangeDetection.findRefsWithMetadataChanges('4711');
			assert.deepStrictEqual(refsWithMetadataChanges, { refsWithMetadataChanges: [] });
		});
	});
});
