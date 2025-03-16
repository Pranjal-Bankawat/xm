'use strict';

const Metadata = require('./Metadata');
const MetadataAsyncFactory = require('./MetadataAsyncFactory');
const MetadataSyncFactory = require('./MetadataSyncFactory');
const Reference = require('@sapn/elsa-util-git/Reference');
const getWorkspaceRootDirectory = require('@sapn/elsa-util-workspace/getRootDirectory');
const { resolve } = require('node:path');
const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const { readFile, writeFile } = require('node:fs/promises');

module.exports = class MetadataFactory {
	static #factories = new Map();
	#metadataRevisionCache = new Map();
	#cacheDirectory;
	#workspaceRootDirectory;

	constructor({ workspaceRootDirectory, cacheDirectory }) {
		this.#cacheDirectory = cacheDirectory;
		this.#workspaceRootDirectory = workspaceRootDirectory;
	}

	async create(revision) {
		return this.#create(revision, async (revisionHash, revisionMetadataCacheFilePath) => {
			let revisionMetadataJSON;
			if (!existsSync(revisionMetadataCacheFilePath)) {
				revisionMetadataJSON = await MetadataAsyncFactory.create(revisionHash, this.#workspaceRootDirectory);
				await writeFile(revisionMetadataCacheFilePath, JSON.stringify(revisionMetadataJSON));
			} else {
				revisionMetadataJSON = JSON.parse(await readFile(revisionMetadataCacheFilePath));
			}
			this.#metadataRevisionCache.set(revisionHash, Metadata.from(revisionMetadataJSON));
			return this.#metadataRevisionCache.get(revisionHash);
		});
	}

	createSync(revision) {
		return this.#create(revision, (revisionHash, revisionMetadataCacheFilePath) => {
			let revisionMetadataJSON;
			if (!existsSync(revisionMetadataCacheFilePath)) {
				revisionMetadataJSON = MetadataSyncFactory.create(revisionHash, this.#workspaceRootDirectory);
				writeFileSync(revisionMetadataCacheFilePath, JSON.stringify(revisionMetadataJSON));
			} else {
				revisionMetadataJSON = JSON.parse(readFileSync(revisionMetadataCacheFilePath));
			}
			return Metadata.from(revisionMetadataJSON);
		});
	}

	#create(revision, revisionMetadataFactoryFunction) {
		if (!this.#metadataRevisionCache.has(revision)) {
			const revisionHash = Reference.create(revision).hash;
			if (!this.#metadataRevisionCache.has(revisionHash)) {
				const revisionMetadataCacheFilePath = resolve(this.#cacheDirectory, `${revisionHash}.json`);
				this.#metadataRevisionCache.set(revisionHash, revisionMetadataFactoryFunction(revisionHash, revisionMetadataCacheFilePath));
			}
			return this.#metadataRevisionCache.get(revisionHash);
		}
		return this.#metadataRevisionCache.get(revision);
	}

	async createForWorkspaceChanges() {
		const metadata = await MetadataAsyncFactory.createForWorkspaceChanges(this.#workspaceRootDirectory);
		return Metadata.from(metadata);
	}

	createForWorkspaceChangesSync() {
		const metadata = MetadataSyncFactory.createForWorkspaceChanges(this.#workspaceRootDirectory);
		return Metadata.from(metadata);
	}

	merge(...metadata) {
		return Metadata.from(this.#mergeMetadataJSON(...metadata.map(source => source.toJSON())));
	}

	static get(workspaceRootDirectory = getWorkspaceRootDirectory()) {
		if (!MetadataFactory.#factories.has(workspaceRootDirectory)) {
			const cacheDirectory = resolve(workspaceRootDirectory, 'node_modules', '.cache', 'elsa', 'metadata');
			if (!existsSync(cacheDirectory)) {
				mkdirSync(cacheDirectory, { recursive: true });
			}
			MetadataFactory.#factories.set(
				workspaceRootDirectory,
				new MetadataFactory({
					cacheDirectory,
					workspaceRootDirectory
				})
			);
		}
		return MetadataFactory.#factories.get(workspaceRootDirectory);
	}

	#mergeMetadataJSON(targetMetadataJSON, ...sourceMetadataJSONs) {
		for (const sourceMetadataJSON of sourceMetadataJSONs) {
			targetMetadataJSON.filePaths = Array.from(new Set([...targetMetadataJSON.filePaths, ...sourceMetadataJSON.filePaths]));
			targetMetadataJSON.fullNameMap = Array.from(
				sourceMetadataJSON.fullNameMap.reduce(
					(fullNameMap, [fullName, relativeFilePaths]) => fullNameMap.set(fullName, Array.from(new Set([...(fullNameMap.get(fullName) ?? []), ...relativeFilePaths]))),
					new Map(targetMetadataJSON.fullNameMap)
				)
			);
			targetMetadataJSON.usageMap = Array.from(
				sourceMetadataJSON.usageMap.reduce(
					(usageMap, [key, usageRelativeFilePaths]) => usageMap.set(key, Array.from(new Set([...(usageMap.get(key) ?? []), ...usageRelativeFilePaths]))),
					new Map(targetMetadataJSON.usageMap)
				)
			);
			targetMetadataJSON.metadataMap = Array.from(
				sourceMetadataJSON.metadataMap.reduce(
					(metadataJSON, [relativeFilePath, metadata]) => metadataJSON.set(relativeFilePath, metadata),
					new Map(targetMetadataJSON.metadataMap)
				)
			);
		}
		return targetMetadataJSON;
	}
};
