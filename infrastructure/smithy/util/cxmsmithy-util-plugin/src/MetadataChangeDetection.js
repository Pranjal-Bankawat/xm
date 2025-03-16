'use strict';
const assert = require('node:assert');
const { executeSync } = require('@sapn/elsa-util-task');
const getWorkspaceRootDirectory = require('@sapn/elsa-util-workspace/getRootDirectory');
const { MetadataJSONFilePathAllowPattern } = require('./Constant');

const getAncestryRefs = (endRef, startRef, numberOfRefs = 0) => {
	const { code, stdout, stderr } = executeSync(`git rev-list --ancestry-path ${numberOfRefs ? endRef + '~' + numberOfRefs : endRef}...${startRef}`, [], {
		cwd: getWorkspaceRootDirectory(),
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048
	});
	assert(code === 0, `Runtime Exception: failed to get git ancestry refs for endRef: ${endRef} and startRef: ${startRef}\n${stderr}`);
	return stdout ? stdout.split('\n') : [];
};

const doesChangeListContainMetadataChange = fileChangeList => {
	for (const file of fileChangeList) {
		if (MetadataJSONFilePathAllowPattern.test(file)) {
			return true;
		}
	}
	return false;
};

const getChangedFilesInGitRef = ref => {
	const { code, stdout, stderr } = executeSync(`git diff-tree --no-commit-id --name-only ${ref} -r`, [], {
		cwd: getWorkspaceRootDirectory(),
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048
	});
	assert(code === 0, `Runtime Exception: git list files for ref ${ref} failed\n${stderr}`);
	return stdout.split('\n');
};

const findRefsWithMetadataChanges = (endRef, startRef = 'HEAD') => {
	const refs = getAncestryRefs(endRef, startRef);
	const refsWithMetadataChanges = [];
	for (const ref of refs) {
		const filesInRef = getChangedFilesInGitRef(ref);
		if (doesChangeListContainMetadataChange(filesInRef)) {
			refsWithMetadataChanges.push(ref);
		}
	}
	return { refsWithMetadataChanges };
};

const findFirstAncestorWithMetadataChange = (startRef = 'HEAD') => {
	const MAX_REF_DISTANCE = 500;
	const refs = getAncestryRefs('HEAD', startRef, MAX_REF_DISTANCE);
	for (const ref of refs) {
		const filesInRef = getChangedFilesInGitRef(ref);
		if (doesChangeListContainMetadataChange(filesInRef)) {
			return ref;
		}
	}
	throw new Error(`Runtime Exception: Could not find a metadata change in ${MAX_REF_DISTANCE} ancestor refs`);
};

module.exports = {
	findFirstAncestorWithMetadataChange,
	findRefsWithMetadataChanges
};
