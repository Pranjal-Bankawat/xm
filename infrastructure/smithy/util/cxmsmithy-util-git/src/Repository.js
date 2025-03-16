'use strict';

const Task = require('@sapn/elsa-util-task');
const getWorkspaceRootDirectory = require('@sapn/elsa-util-workspace/getRootDirectory');

module.exports = class Repository {
	static get remote() {
		const { code, stdout = 'origin', stderr } = Task.executeSync('git remote', [], { shell: true, stdio: 'pipe' });
		if (code === 0) {
			return stdout;
		} else {
			throw new Error(stderr);
		}
	}

	static get targets() {
		const { code, stdout = '', stderr } = Task.executeSync(`git branch --remote --list '${this.remote}/release/*'`, [], { shell: true, stdio: 'pipe' });
		if (code === 0) {
			const releases = stdout.split('\n').reduce((releases, release) => {
				release.trim();
				return release.trim().length > 0 ? [...releases, release.trim()] : releases;
			}, []);
			return ['origin/main', 'origin/hotfix', ...releases];
		} else {
			throw new Error(stderr);
		}
	}

	static untrackedFiles() {
		const { code, stdout, stderr } = Task.executeSync('git ls-files --others --exclude-standard', [], { shell: true, stdio: 'pipe' });
		if (code === 0) {
			return stdout.split('\n');
		} else {
			throw new Error(stderr);
		}
	}

	static checkout(files) {
		const projectRoot = getWorkspaceRootDirectory();
		const { code, stderr } = Task.executeSync(`git checkout -- ${files.join(' ')}`, [], {
			shell: true,
			stdio: 'pipe',
			cwd: projectRoot
		});

		if (code !== 0) {
			throw new Error(stderr);
		}
	}
};
