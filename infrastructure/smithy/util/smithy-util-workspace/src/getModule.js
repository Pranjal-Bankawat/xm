const fs = require('node:fs');
const path = require('node:path');
const getRootDirectory = require('./getRootDirectory');
const get = require('./get');

const DIRECTORY_BLOCK_LIST = ['node_modules', 'src', 'test', 'metadata', 'content', 'report', 'dist', 'bin', 'certificates', 'fixtures', 'assets', 'k8s', 'proto', 'coverage'];
const UNSTRUCTURED_MODULES = ['infrastructure', 'job', 'service'];

function getPackagesInModule(directory, packages = new Set()) {
	const entriesInDirectory = fs
		.readdirSync(directory)
		.filter(file => !DIRECTORY_BLOCK_LIST.includes(file))
		.map(file => path.resolve(directory, file));
	if (entriesInDirectory.find(file => file.endsWith('package.json'))) {
		const packageJson = JSON.parse(fs.readFileSync(path.resolve(directory, 'package.json')));
		packages.add(packageJson.name);
	}
	const subDirectories = entriesInDirectory.filter(file => fs.statSync(file).isDirectory());
	subDirectories.forEach(subDir => {
		const packagesInSubdir = getPackagesInModule(subDir, packages);
		packagesInSubdir.forEach(packageName => packages.add(packageName));
	}, packages);
	return packages;
}

module.exports = function getModule(moduleName = '', scopes = {}) {
	const root = getRootDirectory();
	const moduleDirectories = fs.readdirSync(path.resolve(root, 'module')).map(file => path.resolve(root, 'module', file));
	moduleDirectories.push(...UNSTRUCTURED_MODULES.map(module => path.resolve(root, module)));
	const mdoulesToConsider = moduleDirectories.filter(file => (fs.statSync(file).isDirectory() && moduleName ? file.endsWith(moduleName) : true));

	const workspace = get([], { ...scopes });
	return mdoulesToConsider.reduce((modules, moduleDir) => {
		const module = {
			name: path.basename(moduleDir),
			location: moduleDir,
			packages: [...getPackagesInModule(moduleDir)]
		};

		module.packages = module.packages.reduce((validPackages, packageName) => {
			const packageWorkspace = workspace[packageName];
			if (packageWorkspace) {
				packageWorkspace.context = path.relative(moduleDir, packageWorkspace.context);
				validPackages.push(packageWorkspace);
			}
			return validPackages;
		}, []);

		if (module.packages.length > 0) {
			modules.push(module);
		}
		return modules;
	}, []);
};
