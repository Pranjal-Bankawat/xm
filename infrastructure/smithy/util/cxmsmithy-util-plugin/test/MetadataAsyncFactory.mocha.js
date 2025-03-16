'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('node:assert');
const { basename, extname, resolve } = require('node:path');
const sinon = require('sinon');

let MetadataAsyncFactory, getWorkspaces, getWorkspaceRootDirectory, fs, task, workspaces, workspaceRootDirectory;
let changedFiles, newFiles, files, fileContent;

describe('MetadataAsyncFactory', function () {
	before(function () {
		this.timeout(0);
		getWorkspaceRootDirectory = sinon.stub();
		getWorkspaces = sinon.stub();
		task = {
			execute: sinon.stub()
		};
		fs = {
			readFile: sinon.stub()
		};

		MetadataAsyncFactory = rewiremock.proxy(() => require('../src/MetadataAsyncFactory'), {
			'@sapn/elsa-util-workspace/get': getWorkspaces,
			'@sapn/elsa-util-workspace/getRootDirectory': getWorkspaceRootDirectory,
			'@sapn/elsa-util-task': task,
			'node:fs/promises': fs
		});
	});

	beforeEach(function () {
		getWorkspaceRootDirectory.reset();
		workspaceRootDirectory = '/workspaceRootDirectory';
		getWorkspaceRootDirectory.returns(workspaceRootDirectory);

		getWorkspaces.reset();
		workspaces = {
			'@sapn/package': {
				context: 'application/sap-n-package',
				name: 'packageName'
			}
		};
		getWorkspaces.returns(workspaces);

		files = [
			'application/sap-n-package/content/entity/someEntityContent.json',
			'application/sap-n-package/content/text/someText.json',
			'application/sap-n-package/metadata/analyticalmodel/someAnalyticalModel.json',
			'application/sap-n-package/metadata/api/someApi.json',
			'application/sap-n-package/metadata/businessobject/someBusinessObject.json',
			'application/sap-n-package/metadata/datatype/someDataType.json',
			'application/sap-n-package/metadata/entity/someEntity.json',
			'application/sap-n-package/metadata/event/someEvent.json',
			'application/sap-n-package/metadata/service/someService.json',
			'application/sap-n-package/metadata/serviceadaptation/someServiceAdaptation.json',
			'application/sap-n-package/metadata/uiapp/someUIApp.json',
			'application/sap-n-package/metadata/uiview/someUIView.json'
		];

		changedFiles = [files[0], files[3]];
		newFiles = ['application/sap-n-package/content/text/someNewText.json', 'application/sap-n-package/metadata/entity/someNewEntity.json'];

		task.execute.reset();
		task.execute.withArgs('git rev-parse HEAD').resolves({ code: 0, stdout: 'revision' });
		task.execute.withArgs('git rev-parse someRevision').resolves({ code: 0, stdout: 'revision' });
		task.execute.withArgs('git ls-tree -r --name-only revision').resolves({ code: 0, stdout: files.join('\n') });
		task.execute.withArgs('git --no-pager diff --name-only --diff-filter=ACMRTUX').resolves({
			code: 0,
			stdout: changedFiles.join('\n')
		});
		task.execute.withArgs('git ls-files --others --exclude-standard').resolves({
			code: 0,
			stdout: newFiles.join('\n')
		});
		files.forEach(relativeFilePath => {
			const fileName = basename(relativeFilePath, extname(relativeFilePath));
			fileContent = JSON.stringify({
				fullName: `${fileName}FullName`,
				serviceFullName: `${fileName}ServiceFullName`,
				labelTextId: `${fileName}LabelTextId`
			});
			task.execute.withArgs(`git show revision:${relativeFilePath}`).resolves({ code: 0, stdout: fileContent });
		});
		fs.readFile.reset();
		[...changedFiles, ...newFiles].forEach(relativeFilePath => {
			const fileName = basename(relativeFilePath, extname(relativeFilePath));
			fileContent = JSON.stringify({
				fullName: `${fileName}FullName`,
				serviceFullName: `${fileName}ServiceFullName`,
				labelTextId: `${fileName}LabelTextId`
			});
			fs.readFile.withArgs(resolve(workspaceRootDirectory, relativeFilePath)).resolves(fileContent);
		});
	});

	describe('create()', function () {
		it('shall default the workspace root directory', async function () {
			const metadata = await MetadataAsyncFactory.create('someRevision');
			sinon.assert.calledOnce(getWorkspaceRootDirectory);
			assert.strictEqual(metadata.workspaceRootDirectory, workspaceRootDirectory);
		});

		it('shall return the determined revision', async function () {
			const metadata = await MetadataAsyncFactory.create('someRevision');
			assert.strictEqual(metadata.revision, 'revision');
		});

		it('shall filter non-relevant metadata files', async function () {
			const expected = [...files];
			files.push('application/sap-n-package/metadata/invalid/someInvalid.json');
			files.push('application/sap-n-package/content/invalid/someInvalid.json');
			files.push('application/sap-n-package/content/text/someText_en.json');
			files.push('application/sap-n-package/invalid/invalid/someInvalid.json');
			task.execute.withArgs('git ls-tree -r --name-only revision').resolves({
				code: 0,
				stdout: files.join('\n')
			});
			const metadata = await MetadataAsyncFactory.create('someRevision', workspaceRootDirectory);
			assert.deepStrictEqual(metadata.filePaths, expected);
		});

		it('shall generate the metadata for the provided revision and workspace root directory', async function () {
			const metadata = await MetadataAsyncFactory.create('someRevision', workspaceRootDirectory);
			assert.strictEqual(metadata.workspaceRootDirectory, workspaceRootDirectory);
			assert.deepStrictEqual(metadata.filePaths, files);
		});
	});

	describe('createForWorkspaceChanges()', function () {
		it('shall generate the metadata the current git index', async function () {
			const metadata = await MetadataAsyncFactory.createForWorkspaceChanges();
			assert.strictEqual(metadata.revision, undefined);
			assert.strictEqual(metadata.workspaceRootDirectory, workspaceRootDirectory);
			assert.deepStrictEqual(metadata.filePaths, [...changedFiles, ...newFiles]);
		});

		it('shall generate empty metadata if there is no workspace change', async function () {
			task.execute.withArgs('git --no-pager diff --name-only --diff-filter=ACMRTUX').resolves({
				code: 0,
				stdout: ''
			});
			task.execute.withArgs('git ls-files --others --exclude-standard').resolves({ code: 0, stdout: '' });
			const metadata = await MetadataAsyncFactory.createForWorkspaceChanges();
			assert.strictEqual(metadata.revision, undefined);
			assert.strictEqual(metadata.workspaceRootDirectory, workspaceRootDirectory);
			assert.deepStrictEqual(metadata.filePaths, []);
		});
	});
});
