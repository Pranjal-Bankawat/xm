'use strict';

const Task = require('@sapn/elsa-util-task');
const fs = require('node:fs/promises');
const getWorkspaces = require('@sapn/elsa-util-workspace/get');
const { minimatch } = require('minimatch');
const { resolve, join } = require('node:path');

async function lint({ files }) {
	for (const file of files) {
		const fileErrors = await getErrorsForSpecificFile(file);

		if (fileErrors) {
			await generateReport(file, fileErrors);
		}
	}
}

async function lintAll() {
	const { stdout } = await Task.execute('buf ls-files', [], { shell: true, stdio: 'pipe' });
	const allFiles = stdout.split('\n').filter(filePath => filePath !== '');

	await lint({ files: allFiles });
}

async function breaking({ files, gitReference }) {
	const options = files.map(file => `--path ${file}`).join(' ');
	if (!gitReference) {
		const { stdout } = await Task.execute('git rev-parse remotes/origin/main', [], { shell: true, stdio: 'pipe' });
		gitReference = stdout.trim();
	}

	const { code } = await Task.execute(`buf breaking --against .git#ref=${gitReference} ${options}`, [], {
		shell: true,
		stdio: 'pipe'
	});

	if (code) {
		throw new Error(`Changes done in ${files} are incompatible`);
	}
}

async function getErrorsForSpecificFile(file) {
	const { stdout } = await Task.execute(`buf lint --path ${file} --error-format=json`, [], {
		shell: true,
		stdio: 'pipe'
	});
	return stdout;
}

async function generateReport(file, fileErrors) {
	const errors = fileErrors.split('\n').filter(lintError => lintError !== '');
	const workspaces = getWorkspaces(['proto']);

	for (const { context, location } of Object.values(workspaces)) {
		if (minimatch(file, join(context, '**'), { dot: true })) {
			await fs.mkdir(resolve(location, 'report/buf'), { recursive: true });
			await fs.writeFile(resolve(location, 'report/buf/buf.json'), JSON.stringify({ errors }));
		}
	}
}

Object.assign(module.exports, {
	lint,
	breaking,
	lintAll
});
