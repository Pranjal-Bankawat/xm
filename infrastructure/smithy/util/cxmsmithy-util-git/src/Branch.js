'use strict';

const Repository = require('./Repository');
const Task = require('@sapn/elsa-util-task');

module.exports = class Branch {
	static #buffer = new Map();
	#branch;

	constructor(branch) {
		this.#branch = branch;
	}

	get hash() {
		const { code, stdout, stderr } = Task.executeSync(`git rev-parse ${this.#branch}`, [], { shell: true, stdio: 'pipe' });
		if (code !== 0) {
			throw new Error(stderr);
		}
		return stdout;
	}

	get upstream() {
		const targets = Repository.targets;
		const { code, stdout } = Task.executeSync(`git rev-parse ${this.#branch}@{upstream}`, [], { shell: true, stdio: 'pipe' });
		if (code === 0) {
			return stdout;
		} else {
			return this.#walkDownRevisionListAndFindMostRecentTargetBranchReference(targets);
		}
	}

	get upstreamReference() {
		const { code, stdout } = Task.executeSync('git rev-parse --abbrev-ref --symbolic-full-name @{upstream}', [], { shell: true, stdio: 'pipe' });
		if (code === 0) {
			return stdout;
		}
	}

	[Symbol.toPrimitive]() {
		return this.#branch;
	}

	#walkDownRevisionListAndFindMostRecentTargetBranchReference(targets, start = 'HEAD') {
		const { code, stdout, stderr } = Task.executeSync(`git rev-list ${start} -100`, [], { shell: true, stdio: 'pipe' });
		if (code === 0) {
			let commit;
			for (commit of stdout.split('\n').filter(branch => branch.trim().length > 0)) {
				const branches = Branch.contains(commit.trim());
				if (branches.some(branch => targets.includes(branch.trim()))) {
					return commit;
				}
			}
			return this.#walkDownRevisionListAndFindMostRecentTargetBranchReference(targets, commit);
		} else {
			throw new Error(stderr);
		}
	}

	static contains(hash) {
		const { code, stdout = '', stderr } = Task.executeSync(`git branch --remote --contains ${hash}`, [], { shell: true, stdio: 'pipe' });
		if (code === 0) {
			return stdout.split('\n').reduce((branches, branch) => (branch.trim().length > 0 ? [...branches, branch.trim()] : branches), []);
		} else {
			throw new Error(stderr);
		}
	}

	static create(branch) {
		if (!Branch.#buffer.has(branch)) {
			Branch.#buffer.set(branch, new Branch(branch));
		}
		return Branch.#buffer.get(branch);
	}
};
