'use strict';

const assert = require('node:assert');
const { normalize, resolve, win32, posix } = require('node:path');
const { readFileSync } = require('node:fs');
const { executeSync } = require('@sapn/elsa-util-task');
const { MetadataJSONFilePathAllowPattern, MetadataJSONFilePathBlockPattern } = require('./Constant');
const getWorkspaces = require('@sapn/elsa-util-workspace/get');
const getWorkspaceRootDirectory = require('@sapn/elsa-util-workspace/getRootDirectory');
const AbstractMetadataFactory = require('./AbstractMetadataFactory');

module.exports = class MetadataSyncFactory extends AbstractMetadataFactory {
	static create(revision, workspaceRootDirectory = getWorkspaceRootDirectory()) {
		const workspaceMap = this.#determineWorkspaceMap(workspaceRootDirectory);
		const determinedRevision = this.#determineRevision(revision, workspaceRootDirectory);
		const filePathSet = this.#getElsaMetadataJSONFilePaths(determinedRevision, workspaceRootDirectory);
		const [metadataMap, fullNameMap, usageMap] = this.#getElsaMetadataJSONMetadataMap(filePathSet, determinedRevision, workspaceMap, workspaceRootDirectory);

		return {
			metadataMap: Array.from(metadataMap),
			filePaths: Array.from(filePathSet),
			fullNameMap: Array.from(fullNameMap).map(([fullName, relativeFilePathSet]) => [fullName, Array.from(relativeFilePathSet)]),
			revision: determinedRevision,
			usageMap: Array.from(usageMap).map(([key, usageRelativeFilePathSet]) => [key, Array.from(usageRelativeFilePathSet)]),
			workspaceRootDirectory
		};
	}

	static createForWorkspaceChanges(workspaceRootDirectory = getWorkspaceRootDirectory()) {
		const changedFilePathSet = this.#getChangedElsaMetadataJSONFilePaths(workspaceRootDirectory);
		if (changedFilePathSet.size > 0) {
			const workspaceMap = this.#determineWorkspaceMap(workspaceRootDirectory);
			const [metadataMap, fullNameMap, usageMap] = this.#determineChangedElsaMetadataJSONMetadataMap(changedFilePathSet, workspaceMap, workspaceRootDirectory);
			return {
				metadataMap: Array.from(metadataMap),
				filePaths: Array.from(changedFilePathSet),
				fullNameMap: Array.from(fullNameMap).map(([fullName, relativeFilePathSet]) => [fullName, Array.from(relativeFilePathSet)]),
				usageMap: Array.from(usageMap).map(([key, usageRelativeFilePathSet]) => [key, Array.from(usageRelativeFilePathSet)]),
				workspaceRootDirectory
			};
		} else {
			return {
				metadataMap: [],
				filePaths: Array.from(changedFilePathSet),
				fullNameMap: [],
				usageMap: [],
				workspaceRootDirectory
			};
		}
	}

	static #determineWorkspaceMap(workspaceRootDirectory) {
		const workspaces = getWorkspaces(null, {}, workspaceRootDirectory);
		return new Map(Object.values(workspaces).map(({ context, name }) => [context, name]));
	}

	static #determineChangedElsaMetadataJSONMetadataMap(changedRelativeFilePathSet, workspaceMap, workspaceRootDirectory) {
		const fullNameMap = new Map();
		const usageMap = new Map();
		const metadataMap = new Map(
			Array.from(changedRelativeFilePathSet).map(changedRelativeFilePath => {
				const changedFileContent = readFileSync(resolve(workspaceRootDirectory, changedRelativeFilePath), 'utf8');
				const metadata = this.extractMetadata(changedRelativeFilePath, JSON.parse(changedFileContent), workspaceMap, workspaceRootDirectory);
				this.extractFullName(metadata, fullNameMap);
				this.extractUsage(metadata, usageMap);
				return [changedRelativeFilePath, metadata];
			})
		);

		return [metadataMap, fullNameMap, usageMap];
	}

	static #getChangedElsaMetadataJSONFilePaths(workspaceRootDirectory) {
		const trackedFilePaths = this.#determineTrackedElsaMetadataJSONFilePaths(workspaceRootDirectory);
		const untrackedFilePaths = this.#determineUntrackedElsaMetadataJSONFilePaths(workspaceRootDirectory);
		return new Set([...trackedFilePaths, ...untrackedFilePaths]);
	}

	static #determineTrackedElsaMetadataJSONFilePaths(workspaceRootDirectory) {
		const { code, stdout, stderr } = executeSync('git --no-pager diff --name-only --diff-filter=ACMRTUX', [], {
			cwd: workspaceRootDirectory,
			shell: true,
			stdio: 'pipe',
			maxBuffer: 2048 * 2048
		});
		assert(code === 0, `Runtime Exception: git diff for tracked files failed\n${stderr}`);
		return stdout
			.trim()
			.split('\n')
			.map(normalize)
			.filter(path => MetadataJSONFilePathAllowPattern.test(path) && !MetadataJSONFilePathBlockPattern.test(path));
	}

	static #determineUntrackedElsaMetadataJSONFilePaths(workspaceRootDirectory) {
		const { code, stdout, stderr } = executeSync('git ls-files --others --exclude-standard', [], {
			cwd: workspaceRootDirectory,
			shell: true,
			stdio: 'pipe',
			maxBuffer: 2048 * 2048
		});
		assert(code === 0, `Runtime Exception: git ls-files for untracked files failed\n${stderr}`);
		return stdout
			.trim()
			.split('\n')
			.map(normalize)
			.filter(path => MetadataJSONFilePathAllowPattern.test(path) && !MetadataJSONFilePathBlockPattern.test(path));
	}

	static #determineRevision(revision, workspaceRootDirectory) {
		const { code, stdout, stderr } = executeSync(`git rev-parse ${revision}`, [], {
			cwd: workspaceRootDirectory,
			shell: true,
			stdio: 'pipe'
		});
		assert(code === 0, `Runtime Exception: git rev-parse for revision ${revision} failed\n${stderr}`);
		return stdout.trim();
	}

	static #getElsaMetadataJSONFilePaths(revision, workspaceRootDirectory) {
		const { code, stdout, stderr } = executeSync(`git ls-tree -r --name-only ${revision}`, [], {
			cwd: workspaceRootDirectory,
			shell: true,
			stdio: 'pipe',
			maxBuffer: 2048 * 2048
		});
		assert(code === 0, `Runtime Exception: git list files for revision ${revision} failed\n${stderr}`);
		return new Set(
			stdout
				.trim()
				.split('\n')
				.map(normalize)
				.filter(path => MetadataJSONFilePathAllowPattern.test(path) && !MetadataJSONFilePathBlockPattern.test(path))
		);
	}

	static #getElsaMetadataJSONMetadataMap(relativeFilePathSet, revision, workspaceMap, workspaceRootDirectory) {
		const fullNameMap = new Map();
		const usageMap = new Map();
		const metadataMap = new Map(
			Array.from(relativeFilePathSet).map(relativeFilePath => {
				const relativeGitFilePath = relativeFilePath.split(win32.sep).join(posix.sep);
				const { code, stdout, stderr } = executeSync(`git show ${revision}:${relativeGitFilePath}`, [], {
					cwd: workspaceRootDirectory,
					shell: true,
					stdio: 'pipe',
					maxBuffer: 2048 * 2048
				});
				assert(code === 0, `Runtime Exception: git show for revision ${revision} and file ${relativeFilePath} failed\n${stderr}`);
				const metadata = this.extractMetadata(relativeFilePath, JSON.parse(stdout.trim()), workspaceMap, workspaceRootDirectory);
				this.extractFullName(metadata, fullNameMap);
				this.extractUsage(metadata, usageMap);
				return [relativeFilePath, metadata];
			})
		);
		return [metadataMap, fullNameMap, usageMap];
	}
};
