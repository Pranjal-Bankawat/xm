const { executeSync } = require('@sapn/elsa-util-task');
const { join, relative, resolve, sep, basename } = require('node:path');
const { URL, pathToFileURL, fileURLToPath } = require('node:url');
const getWorkspaceRootDirectory = require('./getRootDirectory');
const getWorkspaceRoot = require('./getRoot');

const WorkspaceScope = '@sapn';
const WorkspaceNodeModulesDirectory = 'node_modules';
const S3UploadPathManifest = 'v2/elsa';
const S3UploadPathUI = 'mfe/v2/modules/elsa';

function _determineWorkspaceScope(workspacePackageNames) {
	return workspacePackageNames?.length > 0 ? workspacePackageNames.map(workspace => `--workspace ${workspace}`).join(' ') : '--workspaces';
}

function _getWorkspaces(workspacePackageNames, workspaceRootDirectory, options = []) {
	const scope = _determineWorkspaceScope(workspacePackageNames);
	const { code, stdout, stderr } = executeSync(`npm ls --all ${scope} --json --depth 0 ${options.join(' ')}`.trim(), [], {
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048,
		cwd: workspaceRootDirectory
	});
	if (code === 0 || (stderr?.includes('code ELSPROBLEMS') && stdout?.length > 0)) {
		const dependencies = JSON.parse(stdout.trim()).dependencies;
		const workspaces = Object.entries(dependencies)
			.filter(([key]) => key.startsWith(WorkspaceScope))
			.reduce((workspaces, [key, metadata]) => Object.assign(workspaces, { [key]: metadata }), {});
		return workspaces;
	} else {
		throw stderr;
	}
}

function _getWorkspaceElsaMetadata(workspaceRootDirectory) {
	const { code, stdout, stderr } = executeSync('npm pkg --workspaces get elsa', [], {
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048,
		cwd: workspaceRootDirectory
	});
	if (code === 0) {
		return JSON.parse(stdout.trim());
	} else {
		throw stderr;
	}
}

function _getProjectsWithTarget(target, workspaceRootDirectory) {
	const { code, stdout, stderr } = executeSync(`npx nx show projects --with-target=${target}`, [], {
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048,
		cwd: workspaceRootDirectory
	});

	if (code === 0) {
		return stdout.trim().split('\n');
	} else {
		throw stderr;
	}
}

function _getWorkspacePackageNames(workspacePackageNames, workspaceRootDirectory) {
	const workspaceScope = _determineWorkspaceScope(workspacePackageNames);
	const { code, stdout, stderr } = executeSync(`npm pkg ${workspaceScope} get name`, [], {
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048,
		cwd: workspaceRootDirectory
	});

	if (code === 0) {
		const lines = stdout.trim().split('\n');
		return Object.keys(JSON.parse(lines.slice(lines.findIndex(line => line.trim() === '{')).join('\n')));
	} else {
		throw stderr;
	}
}

function _getWorkspaceNXTargetMetadata(workspacePackageNames, workspaceRootDirectory, target) {
	const nxTargetMetadata = workspacePackageNames.reduce((nxTargetMetadata, projectName) => Object.assign(nxTargetMetadata, { [projectName]: {} }), {});

	if (target.build) {
		const projectsWithTargetBuild = _getProjectsWithTarget('build', workspaceRootDirectory);
		for (const packageName of workspacePackageNames) {
			Object.assign(nxTargetMetadata[packageName], {
				build: projectsWithTargetBuild.includes(packageName)
			});
		}
	}

	if (target.sonar) {
		const projectsWithTargetLintSonar = _getProjectsWithTarget('lint:sonar', workspaceRootDirectory);
		projectsWithTargetLintSonar.push(..._getProjectsWithTarget('lint:compliance:sonar', workspaceRootDirectory));
		projectsWithTargetLintSonar.push(..._getProjectsWithTarget('lint:compatibility:sonar', workspaceRootDirectory));
		const projectsWithTargetCoverageSonar = _getProjectsWithTarget('coverage:sonar', workspaceRootDirectory);
		for (const packageName of workspacePackageNames) {
			Object.assign(nxTargetMetadata[packageName], {
				sonar: {
					lint: projectsWithTargetLintSonar.includes(packageName),
					coverage: projectsWithTargetCoverageSonar.includes(packageName)
				}
			});
		}
	}

	return nxTargetMetadata;
}

function _determineWorkspaceWithElsaDefaultMetadata(metadata, workspace) {
	const { name, moduleName, projectName, manifest } = metadata;

	if (moduleName) {
		workspace.elsa.deployableType = 'elsa';
		workspace.elsa.moduleName = moduleName;
		workspace.elsa.projectName = projectName;
	}

	if (name) {
		workspace.elsa.name = name;
	}

	if (manifest) {
		workspace.elsa.manifest = {};

		workspace.elsa.manifest.paths = manifest.paths.map(path => join(workspace.elsa.context, path));
		workspace.elsa.manifest.includes = workspace.elsa.manifest.paths.map(path => join(path, '**', 'manifest.yaml'));
		workspace.elsa.manifest.s3UploadPath = S3UploadPathManifest;
	}

	return workspace;
}

function _determineWorkspaceWithElsaWorkloadMetadata(metadata, workspace) {
	const {
		name,
		moduleName,
		projectName,
		manifestBasePath,
		baseImageName,
		manifestImageName,
		includes,
		manifest,
		manifestPaths = [],
		manifestReplacements,
		security,
		moduleOwner,
		build,
		delivery
	} = metadata[workspace.elsa.deployableType];
	workspace.elsa.image = {
		name: {
			base: baseImageName
		},
		includes: includes
			.split(',')
			.map(include => join(workspace.elsa.context, include))
			.join(',')
	};
	workspace.elsa.manifest = {
		...manifest,
		basePath: join(workspace.elsa.context, manifestBasePath),
		imageName: manifestImageName,
		paths: manifestPaths.map(manifestPath => join(workspace.elsa.context, manifestPath)),
		s3UploadPath: S3UploadPathManifest
	};
	if (manifestReplacements) {
		workspace.elsa.manifest.replacements = manifestReplacements;
	}
	workspace.elsa.manifest.includes = workspace.elsa.manifest.paths.map(path => join(path, '**', 'manifest.yaml'));
	if (delivery) {
		workspace.elsa.delivery = delivery;
	}
	workspace.elsa.name = name;
	workspace.elsa.moduleName = moduleName;
	workspace.elsa.projectName = projectName;
	workspace.elsa.security = security;
	workspace.elsa.moduleOwner = moduleOwner;
	workspace.elsa.build = build;
	return workspace;
}

function _determineWorkspaceWithElsaUIMetadata(metadata, workspace) {
	const { name, moduleName, projectName, security, moduleOwner, s3UploadDirectory = basename(workspace.context) } = metadata[workspace.elsa.deployableType];

	workspace.elsa.name = name;
	workspace.elsa.moduleName = moduleName;
	workspace.elsa.projectName = projectName;
	workspace.elsa.s3UploadUIPath = `${S3UploadPathUI}/${s3UploadDirectory}`;
	workspace.elsa.s3UploadManifestPath = S3UploadPathManifest;
	workspace.elsa.security = security;
	workspace.elsa.moduleOwner = moduleOwner;
	return workspace;
}

function _determineWorkspaceWithElsaMetadata(workspace, metadata, workspaceRootDirectory) {
	const context = relative(workspaceRootDirectory, workspace.location);
	workspace.elsa = { context };
	if (metadata) {
		workspace.elsa.owner = metadata.owner;
		workspace.elsa.deployableType = ['service', 'job', 'ui'].find(deployableType => deployableType in metadata);
		switch (workspace.elsa.deployableType) {
			case 'service':
			case 'job':
				return _determineWorkspaceWithElsaWorkloadMetadata(metadata, workspace);
			case 'ui':
				return _determineWorkspaceWithElsaUIMetadata(metadata, workspace);
			default:
				delete workspace.elsa.deployableType;
				return _determineWorkspaceWithElsaDefaultMetadata(metadata, workspace);
		}
	} else {
		return workspace;
	}
}

function _determineDefaults(workspaces, scope, workspaceRootDirectory) {
	const workspaceRootNodeModulesAbsolutePath = `${resolve(workspaceRootDirectory, WorkspaceNodeModulesDirectory, WorkspaceScope)}${sep}`;
	const workspaceRootNodeModulesAbsoluteFileURL = pathToFileURL(workspaceRootNodeModulesAbsolutePath);
	const workspacesWithDefaults = {};

	for (const [name, { resolved, version, dependencies = {} }] of Object.entries(workspaces)) {
		const location = fileURLToPath(new URL(resolved, workspaceRootNodeModulesAbsoluteFileURL));
		workspacesWithDefaults[name] = {
			context: relative(workspaceRootDirectory, location),
			location,
			name,
			root: workspaceRootDirectory,
			version
		};
		if (scope.dependencies) {
			workspacesWithDefaults[name].dependencies = dependencies;
		}
	}

	return workspacesWithDefaults;
}

function _determineElsaMetadata(workspaces, workspaceElsaMetadata, workspaceRootDirectory) {
	const workspacesWithElsaMetadata = {};

	for (const [name, workspace] of Object.entries(workspaces)) {
		workspacesWithElsaMetadata[name] = _determineWorkspaceWithElsaMetadata(workspace, workspaceElsaMetadata[name], workspaceRootDirectory);
	}

	return workspacesWithElsaMetadata;
}

function _determineNXTargetMetadata(workspaces, workspaceScripts) {
	for (const [name, workspace] of Object.entries(workspaces)) {
		const targets = workspaceScripts[name] ?? {};
		if (targets.build) {
			targets.build = {
				outputDirectory: join(workspace.context, 'dist')
			};
		} else {
			delete targets.build;
		}
		workspace.nx = { targets };
	}
	return workspaces;
}

function _workspaceDependencyOriginReducer(workspaceDependencies, name) {
	if (name.startsWith(WorkspaceScope)) {
		workspaceDependencies.internal.package.add(name);
	} else {
		workspaceDependencies.external.package.add(name);
	}
	return workspaceDependencies;
}

function _determineTransientElsaDependencies(workspace, workspaces, visited = new Set()) {
	if (visited.has(workspace.name)) {
		return;
	}

	visited.add(workspace.name);
	for (const dependencyPackageName of workspace.internal.package) {
		const dependency = workspaces.get(dependencyPackageName);
		_determineTransientElsaDependencies(dependency, workspaces, visited);
		dependency.internal.package.forEach(name => workspace.internal.transient.add(name));
		dependency.internal.transient.forEach(name => workspace.internal.transient.add(name));
		dependency.external.package.forEach(name => workspace.external.transient.add(name));
	}
}

function _determineDependencies(workspaces) {
	const workspacesWithDependencies = {};
	const workspaceElsaDependencies = new Map();

	for (const [name, { dependencies = {}, ...workspace }] of Object.entries(workspaces)) {
		workspacesWithDependencies[name] = { ...workspace };

		const workspaceDependencies = Object.keys(dependencies).reduce(_workspaceDependencyOriginReducer, {
			name,
			internal: { package: new Set(), transient: new Set() },
			external: { package: new Set(), transient: new Set() }
		});

		workspaceElsaDependencies.set(name, workspaceDependencies);
	}

	const visited = new Set();
	for (const workspaceDependencies of workspaceElsaDependencies.values()) {
		_determineTransientElsaDependencies(workspaceDependencies, workspaceElsaDependencies, visited);
	}

	for (const [name, workspaceDependencies] of workspaceElsaDependencies) {
		workspacesWithDependencies[name].dependencies = Array.from(new Set([...workspaceDependencies.internal.package, ...workspaceDependencies.internal.transient])).map(name => ({
			name,
			location: workspaces[name].location,
			context: workspaces[name].context
		}));
		Object.assign(workspacesWithDependencies[name].dependencies, {
			internal: {
				package: [...workspaceDependencies.internal.package].sort(),
				transient: [...workspaceDependencies.internal.transient].sort()
			},
			external: {
				package: [...workspaceDependencies.external.package].sort(),
				transient: [...workspaceDependencies.external.transient].sort()
			}
		});
	}

	return workspacesWithDependencies;
}

function _determineProductionDependencies(workspaces, workspaceRootDirectory) {
	const workspacesWithProductionDependencies = _determineDependencies(_getWorkspaces(null, workspaceRootDirectory, ['--omit=dev']));

	for (const [
		name,
		{
			dependencies: { internal, external }
		}
	] of Object.entries(workspacesWithProductionDependencies)) {
		workspaces[name].dependencies.production = { internal, external };
	}

	return workspaces;
}

function _determineDeliveryWorkspaceDependencies(workspaces, allWorkspaces) {
	for (const workspace of Object.values(workspaces)) {
		switch (workspace.elsa?.deployableType) {
			case 'service':
			case 'job':
			case 'ui':
				workspace.dependencies.production.external.required = workspace.dependencies.internal.package
					.reduce((deps, workspaceDependencyName) => {
						const external = allWorkspaces[workspaceDependencyName].dependencies.production.external;
						return Array.from(new Set([...deps, ...external.package, ...external.transient]));
					}, [])
					.sort();
				break;
			default:
				break;
		}
	}

	return workspaces;
}

function _filterWorkspacesByPackageNames(workspacePackageScope, workspaces) {
	if (workspacePackageScope?.length > 0) {
		const workspacePackageNames = _getWorkspacePackageNames(workspacePackageScope);
		return workspacePackageNames.reduce((_workspaces, workspacePackageName) => Object.assign(_workspaces, { [workspacePackageName]: workspaces[workspacePackageName] }), {});
	} else {
		return workspaces;
	}
}

function _getAffectedWorkspacePackageScope(workspacePackageScope, { base, head }, workspaceRootDirectory) {
	head = head ? `--head=${head}` : '';
	const { code, stdout, stderr } = executeSync(`npx nx show projects --affected --base=${base} ${head}`.trim(), [], {
		shell: true,
		stdio: 'pipe',
		maxBuffer: 2048 * 2048,
		cwd: workspaceRootDirectory
	});

	if (code === 0) {
		const affectedWorkspacePackageScope = stdout
			.trim()
			.split('\n')
			.map(workspace => workspace.trim())
			.filter(workspace => workspace.length > 0);
		if (workspacePackageScope?.length > 0) {
			return affectedWorkspacePackageScope.filter(workspace => workspacePackageScope.includes(workspace));
		} else {
			return affectedWorkspacePackageScope;
		}
	} else {
		throw stderr;
	}
}

module.exports = function get(workspacePackageScope, scope = {}, workspaceRootDirectory = getWorkspaceRootDirectory()) {
	let allWorkspaces, workspaces;

	if (scope?.affected?.base) {
		const workspaceRoot = getWorkspaceRoot();
		workspacePackageScope = _getAffectedWorkspacePackageScope(workspacePackageScope, scope.affected, workspaceRootDirectory)?.filter(
			workspacePackageName => workspacePackageName !== workspaceRoot.name
		);
	}

	if (scope.dependencies) {
		allWorkspaces = _getWorkspaces(null, workspaceRootDirectory);
		allWorkspaces = _determineDefaults(allWorkspaces, scope, workspaceRootDirectory);
		allWorkspaces = _determineDependencies(allWorkspaces);
		allWorkspaces = _determineProductionDependencies(allWorkspaces, workspaceRootDirectory);
		workspaces = _filterWorkspacesByPackageNames(workspacePackageScope, allWorkspaces);
	} else {
		workspaces = _getWorkspaces(workspacePackageScope, workspaceRootDirectory);
		workspaces = _determineDefaults(workspaces, scope, workspaceRootDirectory);
	}

	if (Object.values(scope?.nx?.targets ?? {}).some(active => active === true)) {
		const workspacePackageNames = _getWorkspacePackageNames(workspacePackageScope, workspaceRootDirectory);
		const nxTargetMetadata = _getWorkspaceNXTargetMetadata(workspacePackageNames, workspaceRootDirectory, scope.nx.targets);
		workspaces = _determineNXTargetMetadata(workspaces, nxTargetMetadata);
	}

	if (scope.metadata) {
		const workspaceMetadata = _getWorkspaceElsaMetadata(workspaceRootDirectory);
		workspaces = _determineElsaMetadata(workspaces, workspaceMetadata, workspaceRootDirectory);
		if (scope.dependencies) {
			workspaces = _determineDeliveryWorkspaceDependencies(workspaces, allWorkspaces);
		}
	}

	return workspaces;
};
