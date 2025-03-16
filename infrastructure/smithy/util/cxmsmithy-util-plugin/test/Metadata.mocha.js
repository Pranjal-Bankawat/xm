'use strict';

const Metadata = require('../src/Metadata');
const assert = require('node:assert');

let metadata, metadataJSON;

describe('Metadata', function () {
	beforeEach(function () {
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
		metadata = Metadata.from(metadataJSON);
	});

	describe('#revision', function () {
		it('shall return the revision', function () {
			assert.strictEqual(metadata.revision, metadataJSON.revision);
		});
	});

	describe('#workspaceRootDirectory', function () {
		it('shall return the workspace root directory', function () {
			assert.strictEqual(metadata.workspaceRootDirectory, metadataJSON.workspaceRootDirectory);
		});
	});

	describe('#fullNameMap', function () {
		it('shall return the fullNameMap', function () {
			assert.deepStrictEqual(Array.from(metadata.fullNameMap), metadataJSON.fullNameMap);
		});
	});

	describe('#metadataMap', function () {
		it('shall return the metadataMap', function () {
			assert.deepStrictEqual(Array.from(metadata.metadataMap), metadataJSON.metadataMap);
		});
	});

	describe('#usageMap', function () {
		it('shall return the usageMap', function () {
			assert.deepStrictEqual(Array.from(metadata.usageMap), metadataJSON.usageMap);
		});
	});

	describe('#toJSON()', function () {
		it('shall return the pure JSON metadata', function () {
			assert.deepStrictEqual(metadata.toJSON(), metadataJSON);
		});
	});

	describe('from()', function () {
		it('shall create the metadata from the pure JSON metadata', function () {
			assert.strictEqual(Metadata.from(metadataJSON) instanceof Metadata, true);
		});
	});
});
