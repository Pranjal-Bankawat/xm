'use strict';

const rewiremock = require('rewiremock/node');
const { resolve } = require('node:path');
const assert = require('assert');
const sinon = require('sinon');

const npmWorkspaceDependencies = require('../fixtures/npmWorkspaceDependencies');
const npmWorkspaceProductionDependencies = require('../fixtures/npmWorkspaceProductionDependencies');
const npmWorkspacePackageGetElsa = require('../fixtures/npmWorkspacePackageGetElsa.json');
const npmWorkspacePackageGetNames = require('../fixtures/npmWorkspacePackageGetName.json');
const nxPrintAffectedTargetBuild = require('../fixtures/nxPrintAffectedTargetBuild.json');

const elsaWorkspaces = require('../fixtures/elsaWorkspaces.js');
const elsaWorkspacePropertyScopeDefault = ['context', 'location', 'name', 'root', 'version'];
const elsaWorkspacePropertyScopeDependencies = [...elsaWorkspacePropertyScopeDefault, 'dependencies'];
const elsaWorkspacePropertyScopeMetadata = [...elsaWorkspacePropertyScopeDefault, 'elsa'];
const elsaWorkspacePropertyScopeMetadataDependencies = [...elsaWorkspacePropertyScopeMetadata, 'dependencies'];
const elsaWorkspacePropertyScopeNXTargets = [...elsaWorkspacePropertyScopeDefault, 'nx'];
const elsaWorkspacePropertyScopeAll = [...elsaWorkspacePropertyScopeDefault, 'dependencies', 'elsa', 'nx'];

function getFilteredNpmWorkspaces(npmWorkspaceDependencies, scope) {
	const { dependencies, ...header } = npmWorkspaceDependencies;
	return {
		dependencies: Object.entries(dependencies)
			.filter(([key]) => scope.includes(key))
			.reduce((npmWorkspaceDependencies, [name, dependency]) => Object.assign(npmWorkspaceDependencies, { [name]: dependency }), {}),
		...header
	};
}

function copyElsaWorkspaces() {
	const elsaWorkspacesString = JSON.stringify(elsaWorkspaces, (key, value) => {
		if (key === 'dependencies') {
			const { internal, external, production } = value;
			return {
				value,
				internal,
				external,
				production
			};
		} else {
			return value;
		}
	});

	return JSON.parse(elsaWorkspacesString, (key, value) => {
		if (key === 'dependencies') {
			const { value: dependencies, internal, external, production } = value;
			return Object.assign(dependencies, { internal, external, production });
		} else {
			return value;
		}
	});
}

function getFilteredElsaWorkspaces(scope) {
	return Object.entries(copyElsaWorkspaces()).reduce(
		(elsaWorkspaces, [name, workspace]) =>
			Object.assign(elsaWorkspaces, {
				[name]: Object.entries(workspace)
					.filter(([key]) => scope.includes(key))
					.reduce((workspace, [key, value]) => Object.assign(workspace, { [key]: value }), {})
			}),
		{}
	);
}

const workspaceRootDirectory = resolve(__dirname, '../../../../../');

let getRoot, getRootDirectory, task, get;

describe('get', function () {
	before(function () {
		this.timeout(0);
		getRootDirectory = sinon.stub().returns(workspaceRootDirectory);

		task = { executeSync: sinon.stub() };

		get = rewiremock.proxy(() => require('../src/get'), {
			[require.resolve('@sapn/elsa-util-task')]: task,
			[require.resolve('../src/getRootDirectory')]: getRootDirectory
		});
	});

	beforeEach(function () {
		task.executeSync.reset();
		task.executeSync.withArgs('npm ls --all --workspaces --json --depth 0').returns({
			code: 0,
			stdout: JSON.stringify(npmWorkspaceDependencies)
		});
		task.executeSync.withArgs('npm ls --all --workspaces --json --depth 0 --omit=dev').returns({
			code: 0,
			stdout: JSON.stringify(npmWorkspaceProductionDependencies)
		});
		task.executeSync.withArgs('npm ls --all --workspace @sapn/elsa --json --depth 0').returns({
			code: 0,
			stdout: JSON.stringify(getFilteredNpmWorkspaces(npmWorkspaceDependencies, ['@sapn/elsa']))
		});
		task.executeSync.withArgs('npm ls --all --workspace @sapn/elsa --json --depth 0 --omit=dev').returns({
			code: 0,
			stdout: JSON.stringify(getFilteredNpmWorkspaces(npmWorkspaceProductionDependencies, ['@sapn/elsa']))
		});
		task.executeSync.withArgs('npm ls --all --workspace @sapn/ui --json --depth 0').returns({
			code: 0,
			stdout: JSON.stringify(getFilteredNpmWorkspaces(npmWorkspaceDependencies, ['@sapn/ui']))
		});
		task.executeSync.withArgs('npm ls --all --workspace @sapn/common-ui --json --depth 0').returns({
			code: 0,
			stdout: JSON.stringify(getFilteredNpmWorkspaces(npmWorkspaceDependencies, ['@sapn/common-ui']))
		});
		task.executeSync.withArgs('npm ls --all --workspace @sapn/ui --json --depth 0 --omit=dev').returns({
			code: 0,
			stdout: JSON.stringify(getFilteredNpmWorkspaces(npmWorkspaceProductionDependencies, ['@sapn/ui']))
		});
		task.executeSync.withArgs('npm ls --all --workspace @sapn/elsa --workspace @sapn/elsa-util --json --depth 0').returns({
			code: 0,
			stdout: JSON.stringify(getFilteredNpmWorkspaces(npmWorkspaceDependencies, ['@sapn/elsa', '@sapn/elsa-util']))
		});
		task.executeSync.withArgs('npm ls --all --workspace @sapn/elsa --workspace @sapn/elsa-util --json --depth 0 --omit=dev').returns({
			code: 0,
			stdout: JSON.stringify(getFilteredNpmWorkspaces(npmWorkspaceProductionDependencies, ['@sapn/elsa', '@sapn/elsa-util']))
		});

		const scopes = ['--workspaces', '--workspace @sapn/elsa', '--workspace @sapn/ui', '--workspace @sapn/common-ui', '--workspace @sapn/elsa --workspace @sapn/elsa-util'];

		task.executeSync.withArgs(`npm pkg --workspaces get elsa`).returns({
			code: 0,
			stdout: JSON.stringify(npmWorkspacePackageGetElsa)
		});

		scopes.forEach(scope => {
			const names = scope.split(' ').filter(arg => arg.startsWith('@sapn/'));
			const _npmWorkspacePackageGetNames = names.length > 0 ? names.reduce((_names, name) => Object.assign(_names, { [name]: name }), {}) : npmWorkspacePackageGetNames;
			task.executeSync.withArgs(`npm pkg ${scope} get name`).returns({
				code: 0,
				stdout: JSON.stringify(_npmWorkspacePackageGetNames)
			});
		});

		const workspacesWithoutNX = ['@sapn/dummy', '@sapn/elsa-job', '@sapn/elsa-k8s'];
		const workspaceNames = Object.keys(npmWorkspaceDependencies.dependencies).filter(name => name.startsWith('@sapn/') && !workspacesWithoutNX.includes(name));
		const affectedWorkspaceNames = ['@sapn/elsa', '@sapn/elsa-util'];

		task.executeSync.withArgs('npx nx show projects --affected --base=someBase').returns({
			code: 0,
			stdout: affectedWorkspaceNames.join('\n')
		});
		task.executeSync.withArgs('npx nx show projects --affected --base=someBase --head=someHead').returns({
			code: 0,
			stdout: affectedWorkspaceNames.join('\n')
		});
		task.executeSync.withArgs('npx nx show projects --with-target=lint:sonar').returns({
			code: 0,
			stdout: workspaceNames.join('\n')
		});
		task.executeSync.withArgs('npx nx show projects --with-target=lint:compliance:sonar').returns({
			code: 0,
			stdout: workspaceNames.join('\n')
		});
		task.executeSync.withArgs('npx nx show projects --with-target=lint:compatibility:sonar').returns({
			code: 0,
			stdout: workspaceNames.join('\n')
		});
		task.executeSync.withArgs('npx nx show projects --with-target=coverage:sonar').returns({
			code: 0,
			stdout: workspaceNames.join('\n')
		});
		task.executeSync.withArgs('npx nx show projects --with-target=build').returns({
			code: 0,
			stdout: nxPrintAffectedTargetBuild.tasks.map(({ target }) => target.project).join('\n')
		});

		getRoot = sinon.stub().returns({ name: 'com.sap.n' });
		rewiremock(() => require('../src/getRoot')).with(getRoot);
		rewiremock.enable();
	});

	afterEach(function () {
		rewiremock.disable();
	});

	it('shall throw exception if npm ls invocation failed', function () {
		task.executeSync.withArgs('npm ls --all --workspaces --json --depth 0').returns({
			code: 1,
			stderr: 'someNpmLsError'
		});
		assert.throws(() => get(), /someNpmLsError/);
	});

	it('shall throw exception if npm pkg get elsa invocation failed', function () {
		task.executeSync.withArgs('npm pkg --workspaces get elsa').returns({
			code: 1,
			stderr: 'someNpmPkgError'
		});
		assert.throws(() => get(undefined, { metadata: true }), /someNpmPkgError/);
	});

	it('shall throw exception if npm pkg get names invocation failed', function () {
		task.executeSync.withArgs('npm pkg --workspaces get name').returns({
			code: 1,
			stderr: 'someNpmPkgGetNameError'
		});
		assert.throws(() => get(undefined, { nx: { targets: { sonar: true } } }), /someNpmPkgGetNameError/);
	});

	it('shall throw exception if npx nx show projects for target lint:sonar failed', function () {
		task.executeSync.withArgs('npx nx show projects --with-target=lint:sonar').returns({
			code: 1,
			stderr: 'someNXPrintAffectedLintSonarError'
		});
		assert.throws(() => get(undefined, { nx: { targets: { sonar: true } } }), /someNXPrintAffectedLintSonarError/);
	});

	it('shall throw exception if npx nx show projects for target lint:compliance:sonar failed', function () {
		task.executeSync.withArgs('npx nx show projects --with-target=lint:compliance:sonar').returns({
			code: 1,
			stderr: 'someNXPrintAffectedLintComplianceSonarError'
		});
		assert.throws(() => get(undefined, { nx: { targets: { sonar: true } } }), /someNXPrintAffectedLintComplianceSonarError/);
	});

	it('shall throw exception if npx nx show projects for target lint:compatibility:sonar failed', function () {
		task.executeSync.withArgs('npx nx show projects --with-target=lint:compatibility:sonar').returns({
			code: 1,
			stderr: 'someNXPrintAffectedLintCompatibilitySonarError'
		});
		assert.throws(() => get(undefined, { nx: { targets: { sonar: true } } }), /someNXPrintAffectedLintCompatibilitySonarError/);
	});

	it('shall throw exception if npx nx show projects for target coverage:sonar failed', function () {
		task.executeSync.withArgs('npx nx show projects --with-target=coverage:sonar').returns({
			code: 1,
			stderr: 'someNXPrintAffectedCoverageSonarError'
		});
		assert.throws(() => get(undefined, { nx: { targets: { sonar: true } } }), /someNXPrintAffectedCoverageSonarError/);
	});

	it('shall throw exception if npx nx show projects for target build failed', function () {
		task.executeSync.withArgs('npx nx show projects --with-target=build').returns({
			code: 1,
			stderr: 'someNXPrintAffectedBuildError'
		});
		assert.throws(() => get(undefined, { nx: { targets: { build: true } } }), /someNXPrintAffectedBuildError/);
	});

	it('shall return all workspaces if npm list returns ELSPROBLEMS', function () {
		task.executeSync.withArgs('npm ls --all --workspaces --json --depth 0').returns({
			code: 1,
			stdout: JSON.stringify(npmWorkspaceDependencies),
			stderr: 'ERR! code ELSPROBLEMS'
		});
		const expected = getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeDefault);
		assert.deepStrictEqual(get(), expected);
		sinon.assert.calledOnce(task.executeSync);
		sinon.assert.calledWith(task.executeSync, 'npm ls --all --workspaces --json --depth 0');
	});

	it('shall return all workspaces if no workspace is provided', function () {
		const expected = getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeDefault);
		assert.deepStrictEqual(get(), expected);
		sinon.assert.calledOnce(task.executeSync);
		sinon.assert.calledWith(task.executeSync, 'npm ls --all --workspaces --json --depth 0');
	});

	it('shall return the requested workspace', function () {
		const workspace = '@sapn/elsa';
		const expected = { [workspace]: getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeDefault)[workspace] };
		assert.deepStrictEqual(get([workspace]), expected);
		sinon.assert.calledOnce(task.executeSync);
		sinon.assert.calledWith(task.executeSync, `npm ls --all --workspace ${workspace} --json --depth 0`);
	});

	it('shall return the requested workspace(s)', function () {
		const workspaces = ['@sapn/elsa', '@sapn/elsa-util'];
		const expected = Object.entries(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeDefault))
			.filter(([key]) => workspaces.includes(key))
			.reduce((expected, [key, value]) => Object.assign(expected, { [key]: value }), {});
		assert.deepStrictEqual(get(workspaces), expected);
		sinon.assert.calledOnce(task.executeSync);
		sinon.assert.calledWith(
			task.executeSync,
			`npm ls --all ${workspaces
				.map(ws => ['--workspace', ws])
				.flat()
				.join(' ')} --json --depth 0`
		);
	});

	it('shall return the affected workspace(s)', function () {
		const workspaces = ['@sapn/elsa', '@sapn/elsa-util'];
		const expected = Object.entries(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeDefault))
			.filter(([key]) => workspaces.includes(key))
			.reduce((expected, [key, value]) => Object.assign(expected, { [key]: value }), {});
		assert.deepStrictEqual(get(undefined, { affected: { base: 'someBase' } }), expected);
		sinon.assert.calledTwice(task.executeSync);
		sinon.assert.calledWith(task.executeSync.firstCall, 'npx nx show projects --affected --base=someBase');
	});

	it('shall throw exception if the affected workspaces can not be determined', function () {
		task.executeSync.withArgs('npx nx show projects --affected --base=someBase').returns({
			code: 'error',
			stderr: 'someAffectedError'
		});
		assert.throws(() => get(undefined, { affected: { base: 'someBase' } }), /someAffectedError/);
	});

	it('shall return the filtered affected workspace(s)', function () {
		const workspaces = ['@sapn/elsa'];
		const expected = Object.entries(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeDefault))
			.filter(([key]) => workspaces.includes(key))
			.reduce((expected, [key, value]) => Object.assign(expected, { [key]: value }), {});
		assert.deepStrictEqual(get(['@sapn/elsa'], { affected: { base: 'someBase', head: 'someHead' } }), expected);
		sinon.assert.calledTwice(task.executeSync);
		sinon.assert.calledWith(task.executeSync.firstCall, 'npx nx show projects --affected --base=someBase --head=someHead');
	});

	it('shall return the scoped dependencies for the requested workspace', function () {
		const workspace = '@sapn/elsa';
		const expected = { [workspace]: getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeDependencies)[workspace] };
		Object.values(expected).forEach(({ dependencies }) => delete dependencies.production.external.required);
		assert.deepStrictEqual(get([workspace], { dependencies: true }), expected);
	});

	it('shall return the scoped dependencies for all workspace(s)', function () {
		const expected = getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeDependencies);
		Object.values(expected).forEach(({ dependencies }) => delete dependencies.production.external.required);
		assert.deepStrictEqual(get(undefined, { dependencies: true }), expected);
	});

	it('shall return the scoped metadata for the requested workspace', function () {
		const workspace = '@sapn/elsa';
		const expected = { [workspace]: getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeMetadata)[workspace] };
		assert.deepStrictEqual(get([workspace], { metadata: true }), expected);
		sinon.assert.calledTwice(task.executeSync);
		sinon.assert.calledWith(task.executeSync, `npm pkg --workspaces get elsa`);
	});

	it('shall return the scoped metadata for the all workspace(s)', function () {
		const expected = getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeMetadata);
		assert.deepStrictEqual(get(undefined, { metadata: true }), expected);
		sinon.assert.calledTwice(task.executeSync);
		sinon.assert.calledWith(task.executeSync, 'npm pkg --workspaces get elsa');
	});

	it('shall return the scoped metadata for the requested workspace(s)', function () {
		const workspaces = ['@sapn/elsa', '@sapn/elsa-util'];
		const expected = Object.entries(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeMetadata))
			.filter(([key]) => workspaces.includes(key))
			.reduce((expected, [key, value]) => Object.assign(expected, { [key]: value }), {});
		assert.deepStrictEqual(get(workspaces, { metadata: true }), expected);
		sinon.assert.calledTwice(task.executeSync);
		sinon.assert.calledWith(task.executeSync, `npm pkg --workspaces get elsa`);
	});

	it('shall return the scoped empty nx target metadata for the requested workspace', function () {
		const workspace = '@sapn/elsa';
		const expected = { [workspace]: getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeNXTargets)[workspace] };
		delete expected[workspace].nx;
		assert.deepStrictEqual(get([workspace], { nx: {} }), expected);
		sinon.assert.calledOnce(task.executeSync);
		sinon.assert.neverCalledWith(task.executeSync, 'npx nx show projects --target=lint:sonar');
		sinon.assert.neverCalledWith(task.executeSync, 'npx nx show projects --target=lint:compliance:sonar');
		sinon.assert.neverCalledWith(task.executeSync, 'npx nx show projects --target=lint:compatibility:sonar');
		sinon.assert.neverCalledWith(task.executeSync, 'npx nx show projects --target=coverage:sonar');
	});

	function deleteWorkspaceNXTargets(workspaces, target) {
		Object.keys(workspaces).forEach(key => {
			if (workspaces[key]?.nx?.targets?.[target]) {
				delete workspaces[key]?.nx?.targets?.[target];
			}
		});
		return workspaces;
	}

	it('shall return the scoped nx target sonar metadata for the requested workspace', function () {
		const workspace = '@sapn/elsa';
		const expected = { [workspace]: deleteWorkspaceNXTargets(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeNXTargets), 'build')[workspace] };
		assert.deepStrictEqual(get([workspace], { nx: { targets: { sonar: true } } }), expected);
		sinon.assert.callCount(task.executeSync, 6);
		sinon.assert.calledWith(task.executeSync, `npm pkg --workspace ${workspace} get name`);
		sinon.assert.calledWith(task.executeSync, 'npx nx show projects --with-target=lint:sonar');
		sinon.assert.calledWith(task.executeSync, 'npx nx show projects --with-target=lint:compliance:sonar');
		sinon.assert.calledWith(task.executeSync, 'npx nx show projects --with-target=lint:compatibility:sonar');
		sinon.assert.calledWith(task.executeSync, 'npx nx show projects --with-target=coverage:sonar');
	});

	it('shall return the scoped nx targets sonar metadata for the all workspace(s)', function () {
		const expected = deleteWorkspaceNXTargets(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeNXTargets), 'build');
		assert.deepStrictEqual(get(undefined, { nx: { targets: { sonar: true } } }), expected);
		sinon.assert.callCount(task.executeSync, 6);
		sinon.assert.calledWith(task.executeSync, 'npx nx show projects --with-target=lint:sonar');
		sinon.assert.calledWith(task.executeSync, 'npx nx show projects --with-target=lint:compliance:sonar');
		sinon.assert.calledWith(task.executeSync, 'npx nx show projects --with-target=lint:compatibility:sonar');
		sinon.assert.calledWith(task.executeSync, 'npx nx show projects --with-target=coverage:sonar');
	});

	it('shall return the scoped nx target sonar metadata for the requested workspace(s)', function () {
		const workspaces = ['@sapn/elsa', '@sapn/elsa-util'];
		const expected = deleteWorkspaceNXTargets(
			Object.entries(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeNXTargets))
				.filter(([key]) => workspaces.includes(key))
				.reduce((expected, [key, value]) => Object.assign(expected, { [key]: value }), {}),
			'build'
		);
		assert.deepStrictEqual(get(workspaces, { nx: { targets: { sonar: true } } }), expected);
		sinon.assert.callCount(task.executeSync, 6);
		sinon.assert.calledWith(
			task.executeSync,
			`npm pkg ${workspaces
				.map(ws => ['--workspace', ws])
				.flat()
				.join(' ')} get name`
		);
	});

	it('shall return the scoped nx target build metadata for the requested workspace', function () {
		const workspace = '@sapn/elsa';
		const expected = { [workspace]: deleteWorkspaceNXTargets(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeNXTargets), 'sonar')[workspace] };
		assert.deepStrictEqual(get([workspace], { nx: { targets: { build: true } } }), expected);
		sinon.assert.callCount(task.executeSync, 3);
		sinon.assert.calledWith(task.executeSync, `npm pkg --workspace ${workspace} get name`);
		sinon.assert.calledWith(task.executeSync, 'npx nx show projects --with-target=build');
	});

	it('shall return the scoped nx targets build metadata for the all workspace(s)', function () {
		const expected = deleteWorkspaceNXTargets(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeNXTargets), 'sonar');
		assert.deepStrictEqual(get(undefined, { nx: { targets: { build: true } } }), expected);
		sinon.assert.callCount(task.executeSync, 3);
		sinon.assert.calledWith(task.executeSync, 'npx nx show projects --with-target=build');
	});

	it('shall return the scoped nx target build metadata for the requested workspace(s)', function () {
		const workspaces = ['@sapn/elsa', '@sapn/elsa-util'];
		const expected = deleteWorkspaceNXTargets(
			Object.entries(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeNXTargets))
				.filter(([key]) => workspaces.includes(key))
				.reduce((expected, [key, value]) => Object.assign(expected, { [key]: value }), {}),
			'sonar'
		);
		assert.deepStrictEqual(get(workspaces, { nx: { targets: { build: true } } }), expected);
		sinon.assert.callCount(task.executeSync, 3);
		sinon.assert.calledWith(
			task.executeSync,
			`npm pkg ${workspaces
				.map(ws => ['--workspace', ws])
				.flat()
				.join(' ')} get name`
		);
	});

	it('shall return the metadata dependencies for the requested non deliverable workspace', function () {
		const workspaces = ['@sapn/elsa', '@sapn/elsa-util'];
		const expected = Object.entries(getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeMetadataDependencies))
			.filter(([key]) => workspaces.includes(key))
			.reduce((expected, [key, value]) => Object.assign(expected, { [key]: value }), {});
		assert.deepStrictEqual(
			get(workspaces, {
				dependencies: true,
				metadata: true
			}),
			expected
		);
	});

	it('shall return the completed scope for the requested workspace', function () {
		const workspace = '@sapn/elsa';
		const expected = { [workspace]: getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeAll)[workspace] };
		assert.deepStrictEqual(
			get([workspace], {
				dependencies: true,
				metadata: true,
				nx: { targets: { sonar: true, build: true } }
			}),
			expected
		);
	});

	it('shall return the ui metadata', function () {
		const workspace = '@sapn/ui';
		const expected = { [workspace]: getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeAll)[workspace] };
		assert.deepStrictEqual(
			get([workspace], {
				dependencies: true,
				metadata: true,
				nx: { targets: { sonar: true, build: true } }
			}),
			expected
		);
	});

	it('shall return the common-ui metadata', function () {
		const workspace = '@sapn/common-ui';
		const expected = { [workspace]: getFilteredElsaWorkspaces(elsaWorkspacePropertyScopeAll)[workspace] };
		assert.deepStrictEqual(
			get([workspace], {
				dependencies: true,
				metadata: true,
				nx: { targets: { sonar: true, build: true } }
			}),
			expected
		);
	});
});
