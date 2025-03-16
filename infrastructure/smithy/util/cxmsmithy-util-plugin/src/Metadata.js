'use strict';

module.exports = class Metadata {
	#revision;
	#workspaceRootDirectory;
	#filePaths;
	#metadataMap;
	#fullNameMap;
	#usageMap;

	constructor({ metadataMap, filePaths, fullNameMap, revision, usageMap, workspaceRootDirectory }) {
		this.#metadataMap = metadataMap;
		this.#filePaths = filePaths;
		this.#fullNameMap = fullNameMap;
		this.#revision = revision;
		this.#usageMap = usageMap;
		this.#workspaceRootDirectory = workspaceRootDirectory;
	}

	get revision() {
		return this.#revision;
	}

	get workspaceRootDirectory() {
		return this.#workspaceRootDirectory;
	}

	get fullNameMap() {
		return this.#fullNameMap;
	}

	get metadataMap() {
		return this.#metadataMap;
	}

	get usageMap() {
		return this.#usageMap;
	}

	toJSON() {
		return {
			metadataMap: Array.from(this.#metadataMap),
			filePaths: Array.from(this.#filePaths),
			fullNameMap: Array.from(this.#fullNameMap),
			revision: this.#revision,
			usageMap: Array.from(this.#usageMap),
			workspaceRootDirectory: this.#workspaceRootDirectory
		};
	}

	static from({ metadataMap, filePaths, fullNameMap, revision, usageMap, workspaceRootDirectory }) {
		return new Metadata({
			metadataMap: new Map(metadataMap),
			filePaths: Array.from(filePaths),
			fullNameMap: new Map(fullNameMap),
			revision,
			usageMap: new Map(usageMap),
			workspaceRootDirectory
		});
	}
};
