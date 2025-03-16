const Task = require('@sapn/elsa-util-task');

function affected({ npmPackageName, targets = [], baseRef, headRef }) {
	const targetsParameter = targets.length > 0 ? `--target=${targets.join(',')}` : '';
	const { code, stdout } = Task.executeSync('npx nx show projects', ['--affected', '--json', `--base=${baseRef}`, `--head=${headRef}`, targetsParameter], {
		shell: true,
		stdio: 'pipe'
	});
	if (code !== 0) {
		throw new Error(`Failed to get affected packages: ${stdout.toString()}`);
	}
	const affectedPackages = JSON.parse(stdout.toString());
	return affectedPackages.includes(npmPackageName);
}

module.exports = {
	affected
};
