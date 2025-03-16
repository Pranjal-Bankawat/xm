'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('node:assert');
const { join } = require('node:path');
const sinon = require('sinon');

let Metadata, MetadataFactory, MetadataAsyncFactory, MetadataSyncFactory, Reference;
let fs, getWorkspaceRootDirectory, metadataFactory, metadataJSON;
let workspaceRootDirectory, cacheDirectory, revisionMetadataCacheFilePath;

describe('MetadataFactory', function () {
	before(function () {
		this.timeout(0);
		Reference = {
			create: sinon.stub(),
			hash: 'someRevisionHash'
		};
		getWorkspaceRootDirectory = sinon.stub();
		MetadataAsyncFactory = {
			create: sinon.stub(),
			createForWorkspaceChanges: sinon.stub()
		};
		MetadataSyncFactory = {
			create: sinon.stub(),
			createForWorkspaceChanges: sinon.stub()
		};
		Metadata = {
			from: sinon.stub()
		};
		fs = {
			existsSync: sinon.stub(),
			mkdirSync: sinon.stub(),
			readFileSync: sinon.stub(),
			writeFileSync: sinon.stub(),
			promises: {
				readFile: sinon.stub(),
				writeFile: sinon.stub()
			}
		};
		MetadataFactory = rewiremock.proxy(() => require('../src/MetadataFactory'), {
			[require.resolve('../src/Metadata')]: Metadata,
			[require.resolve('../src/MetadataAsyncFactory')]: MetadataAsyncFactory,
			[require.resolve('../src/MetadataSyncFactory')]: MetadataSyncFactory,
			'@sapn/elsa-util-workspace/getRootDirectory': getWorkspaceRootDirectory,
			'@sapn/elsa-util-git/Reference': Reference,
			'node:fs': fs,
			'node:fs/promises': fs.promises
		});
	});

	beforeEach(function () {
		MetadataSyncFactory.create.reset();
		MetadataSyncFactory.createForWorkspaceChanges.reset();
		MetadataAsyncFactory.create.reset();
		MetadataAsyncFactory.createForWorkspaceChanges.reset();
		metadataJSON = {
			metadataMap: [
				['relativeFilePath', {}],
				['otherRelativeFilePath', {}]
			],
			filePaths: ['relativeFilePath', 'otherRelativeFilePath'],
			fullNameMap: [
				['fullName', ['relativeFilePath']],
				['otherFullName', ['otherRelativeFilePath']]
			],
			revision: 'someRevision',
			usageMap: [['someIdentifier', ['relativeFilePath', 'otherRelativeFilePath']]],
			workspaceRootDirectory: '/workspaceRootDirectory'
		};
		MetadataSyncFactory.create.returns(metadataJSON);
		MetadataSyncFactory.createForWorkspaceChanges.returns(metadataJSON);
		MetadataAsyncFactory.create.resolves(metadataJSON);
		MetadataAsyncFactory.createForWorkspaceChanges.resolves(metadataJSON);

		workspaceRootDirectory = '/workspaceRootDirectory';
		getWorkspaceRootDirectory.reset();
		getWorkspaceRootDirectory.returns(workspaceRootDirectory);

		cacheDirectory = join(workspaceRootDirectory, 'node_modules', '.cache', 'elsa', 'metadata');
		fs.existsSync.reset();
		fs.existsSync.withArgs(cacheDirectory).returns(true);

		Reference.create.reset();
		Reference.create.withArgs('rev').returns(Reference);

		revisionMetadataCacheFilePath = join(cacheDirectory, `${Reference.hash}.json`);
		fs.existsSync.withArgs(revisionMetadataCacheFilePath).returns(true);
		fs.promises.readFile.reset();
		fs.promises.readFile.withArgs(revisionMetadataCacheFilePath).resolves(JSON.stringify(metadataJSON));
		fs.readFileSync.reset();
		fs.readFileSync.withArgs(revisionMetadataCacheFilePath).returns(JSON.stringify(metadataJSON));

		fs.promises.writeFile.reset();
		fs.writeFileSync.reset();
		fs.mkdirSync.reset();

		Metadata.from.reset();
		Metadata.from.returnsArg(0);

		metadataFactory = new MetadataFactory({ workspaceRootDirectory, cacheDirectory });
	});

	describe('#create()', function () {
		it('shall create the metadata for the provided revision if not cached yet', async function () {
			fs.existsSync.withArgs(revisionMetadataCacheFilePath).returns(false);
			const metadata = await metadataFactory.create('rev');
			assert.deepStrictEqual(metadata, metadataJSON);
			sinon.assert.calledOnce(MetadataAsyncFactory.create);
			sinon.assert.calledWith(MetadataAsyncFactory.create, Reference.hash, workspaceRootDirectory);
			sinon.assert.notCalled(fs.promises.readFile);
			sinon.assert.calledOnce(fs.promises.writeFile);
			sinon.assert.calledWith(fs.promises.writeFile, revisionMetadataCacheFilePath);
		});

		it('shall return the metadata for the provided revision from the cache', async function () {
			const metadata = await metadataFactory.create('rev');
			assert.deepStrictEqual(metadata, metadataJSON);
			sinon.assert.notCalled(MetadataAsyncFactory.create);
			sinon.assert.notCalled(fs.promises.writeFile);
			sinon.assert.calledOnce(fs.promises.readFile);
			sinon.assert.calledWith(fs.promises.readFile, revisionMetadataCacheFilePath);
		});

		it('shall return the same metadata if the same revision is requested twice', async function () {
			assert.strictEqual(await metadataFactory.create('rev'), await metadataFactory.create('rev'));
			assert.strictEqual(await metadataFactory.create('rev'), await metadataFactory.create(Reference.hash));
		});
	});

	describe('#createSync()', function () {
		it('shall create the metadata for the provided revision if not cached yet', function () {
			fs.existsSync.withArgs(revisionMetadataCacheFilePath).returns(false);
			const metadata = metadataFactory.createSync('rev');
			assert.deepStrictEqual(metadata, metadataJSON);
			sinon.assert.calledOnce(MetadataSyncFactory.create);
			sinon.assert.calledWith(MetadataSyncFactory.create, Reference.hash, workspaceRootDirectory);
			sinon.assert.notCalled(fs.readFileSync);
			sinon.assert.calledOnce(fs.writeFileSync);
			sinon.assert.calledWith(fs.writeFileSync, revisionMetadataCacheFilePath);
		});

		it('shall return the metadata for the provided revision from the cache', async function () {
			const metadata = await metadataFactory.createSync('rev');
			assert.deepStrictEqual(metadata, metadataJSON);
			sinon.assert.notCalled(MetadataSyncFactory.create);
			sinon.assert.notCalled(fs.writeFileSync);
			sinon.assert.calledOnce(fs.readFileSync);
			sinon.assert.calledWith(fs.readFileSync, revisionMetadataCacheFilePath);
		});

		it('shall return the same metadata if the same revision is requested twice', async function () {
			assert.strictEqual(await metadataFactory.createSync('rev'), await metadataFactory.createSync('rev'));
			assert.strictEqual(await metadataFactory.createSync('rev'), await metadataFactory.createSync(Reference.hash));
		});
	});

	describe('#createForWorkspaceChanges()', function () {
		it('shall resolve the metadata for the staged and untracked workspace changes', async function () {
			assert.strictEqual(await metadataFactory.createForWorkspaceChanges(), metadataJSON);
		});
	});

	describe('#createForWorkspaceChangesSync()', function () {
		it('shall return the metadata for the staged and untracked workspace changes', async function () {
			assert.strictEqual(metadataFactory.createForWorkspaceChangesSync(), metadataJSON);
		});
	});

	describe('#merge()', function () {
		let targetMetadataJSON, targetMetadata, sourceMetadataJSON, sourceMetadata;
		beforeEach(function () {
			targetMetadataJSON = {
				metadataMap: [['targetRelativeFilePath', { fullName: 'someTargetMetadataFullName' }]],
				filePaths: ['/workspaceRootDirectory/targetRelativeFilePath'],
				fullNameMap: [['someTargetMetadataFullName', ['targetRelativeFilePath']]],
				usageMap: [['someTargetMetadataFullName', ['targetRelativeFilePath']]]
			};
			targetMetadata = {
				toJSON: sinon.stub().returns(targetMetadataJSON)
			};
			sourceMetadataJSON = {
				metadataMap: [['sourceRelativeFilePath', { fullName: 'someSourceMetadataFullName' }]],
				filePaths: ['/workspaceRootDirectory/sourceRelativeFilePath'],
				fullNameMap: [['someSourceMetadataFullName', ['sourceRelativeFilePath']]],
				usageMap: [['someSourceMetadataFullName', ['sourceRelativeFilePath']]]
			};
			sourceMetadata = {
				toJSON: sinon.stub().returns(sourceMetadataJSON)
			};
		});

		it('shall merge the metadata into the target metadata', function () {
			assert.deepStrictEqual(metadataFactory.merge(targetMetadata, sourceMetadata), {
				metadataMap: [
					[
						'targetRelativeFilePath',
						{
							fullName: 'someTargetMetadataFullName'
						}
					],
					[
						'sourceRelativeFilePath',
						{
							fullName: 'someSourceMetadataFullName'
						}
					]
				],
				filePaths: ['/workspaceRootDirectory/targetRelativeFilePath', '/workspaceRootDirectory/sourceRelativeFilePath'],
				fullNameMap: [
					['someTargetMetadataFullName', ['targetRelativeFilePath']],
					['someSourceMetadataFullName', ['sourceRelativeFilePath']]
				],
				usageMap: [
					['someTargetMetadataFullName', ['targetRelativeFilePath']],
					['someSourceMetadataFullName', ['sourceRelativeFilePath']]
				]
			});
		});
	});

	describe('get()', function () {
		it('shall return instance of MetadataFactory', function () {
			assert.strictEqual(MetadataFactory.get() instanceof MetadataFactory, true);
		});

		it('shall default the workspace root directory', function () {
			MetadataFactory.get(workspaceRootDirectory);
			MetadataFactory.get();
			sinon.assert.calledOnce(getWorkspaceRootDirectory);
		});

		it('shall create the cache directory if not existing yet', function () {
			cacheDirectory = join('/anotherWorkspaceRootDirectory', 'node_modules', '.cache', 'elsa', 'metadata');
			fs.existsSync.withArgs(cacheDirectory).returns(false);
			MetadataFactory.get('/anotherWorkspaceRootDirectory');
			sinon.assert.calledOnce(fs.mkdirSync);
			sinon.assert.calledWith(fs.mkdirSync, cacheDirectory);
		});

		it('shall always return the same instance', function () {
			assert.strictEqual(MetadataFactory.get(), MetadataFactory.get());
		});
	});
});
