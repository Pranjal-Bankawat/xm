'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('assert');
const sinon = require('sinon');

describe('getModule', function () {
	let getModule, fsMock, getRootDirectoryMock, getMock;
	let packageMetadata;

	before(function () {
		this.timeout(0);

		fsMock = {
			readdirSync: sinon.stub(),
			readFileSync: sinon.stub(),
			statSync: sinon.stub()
		};
		getRootDirectoryMock = sinon.stub();
		getMock = sinon.stub();

		rewiremock(() => require('../src/getRootDirectory')).with(getRootDirectoryMock);
		rewiremock(() => require('../src/get')).with(getMock);
		rewiremock(() => require('node:fs')).with(fsMock);

		rewiremock.enable();
		getModule = require('../src/getModule');
	});

	after(function () {
		rewiremock.disable();
	});

	beforeEach(function () {
		fsMock.readdirSync.reset();
		fsMock.readFileSync.reset();
		fsMock.statSync.reset();
		getRootDirectoryMock.reset();
		getMock.reset();

		getRootDirectoryMock.returns('/elsa');
		fsMock.readdirSync.withArgs('/elsa/module').returns(['elsa-module', 'elsa-other-module']);
		fsMock.readdirSync.withArgs('/elsa/infrastructure').returns(['elsa-infrastructure-package']);
		fsMock.readdirSync.withArgs('/elsa/job').returns(['elsa-job-package']);
		fsMock.readdirSync.withArgs('/elsa/service').returns(['elsa-service-package']);
		fsMock.readdirSync.withArgs('/elsa/module/elsa-module').returns(['elsa-package']);
		fsMock.readdirSync.withArgs('/elsa/module/elsa-other-module').returns(['elsa-other-package']);
		fsMock.readdirSync.withArgs('/elsa/module/elsa-module/elsa-package').returns(['package.json']);
		fsMock.readdirSync.withArgs('/elsa/module/elsa-other-module/elsa-other-package').returns(['package.json']);
		fsMock.readdirSync.withArgs('/elsa/infrastructure/elsa-infrastructure-package').returns(['package.json', 'subdir']);
		fsMock.readdirSync.withArgs('/elsa/infrastructure/elsa-infrastructure-package/subdir').returns(['subpackage']);
		fsMock.readdirSync.withArgs('/elsa/infrastructure/elsa-infrastructure-package/subdir/subpackage').returns(['package.json']);
		fsMock.readdirSync.withArgs('/elsa/job/elsa-job-package').returns(['package.json']);
		fsMock.readdirSync.withArgs('/elsa/service/elsa-service-package').returns(['package.json']);

		fsMock.statSync.withArgs('/elsa/module/elsa-module').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/module/elsa-other-module').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/module/elsa-module/elsa-package').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/module/elsa-other-module/elsa-other-package').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/module/elsa-module/elsa-package/package.json').returns({ isDirectory: () => false });
		fsMock.statSync.withArgs('/elsa/module/elsa-other-module/elsa-other-package/package.json').returns({ isDirectory: () => false });
		fsMock.statSync.withArgs('/elsa/infrastructure').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/infrastructure/elsa-infrastructure-package').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/infrastructure/elsa-infrastructure-package/subdir').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/infrastructure/elsa-infrastructure-package/subdir/subpackage').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/infrastructure/elsa-infrastructure-package/package.json').returns({ isDirectory: () => false });
		fsMock.statSync.withArgs('/elsa/infrastructure/elsa-infrastructure-package/subdir/subpackage/package.json').returns({ isDirectory: () => false });
		fsMock.statSync.withArgs('/elsa/job').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/job/elsa-job-package').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/job/elsa-job-package/package.json').returns({ isDirectory: () => false });
		fsMock.statSync.withArgs('/elsa/service').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/service/elsa-service-package').returns({ isDirectory: () => true });
		fsMock.statSync.withArgs('/elsa/service/elsa-service-package/package.json').returns({ isDirectory: () => false });

		fsMock.readFileSync.withArgs('/elsa/module/elsa-module/elsa-package/package.json').returns('{"name": "elsa-package"}');
		fsMock.readFileSync.withArgs('/elsa/module/elsa-other-module/elsa-other-package/package.json').returns('{"name": "elsa-other-package"}');
		fsMock.readFileSync.withArgs('/elsa/infrastructure/elsa-infrastructure-package/package.json').returns('{"name": "elsa-infrastructure-package"}');
		fsMock.readFileSync.withArgs('/elsa/infrastructure/elsa-infrastructure-package/subdir/subpackage/package.json').returns('{"name": "elsa-infrastructure-sub-package"}');
		fsMock.readFileSync.withArgs('/elsa/job/elsa-job-package/package.json').returns('{"name": "elsa-job-package"}');
		fsMock.readFileSync.withArgs('/elsa/service/elsa-service-package/package.json').returns('{"name": "elsa-service-package"}');

		packageMetadata = {
			'elsa-package': { context: '/elsa/module/elsa-module/elsa-package', name: 'elsa-package' },
			'elsa-other-package': { context: '/elsa/module/elsa-other-module/elsa-other-package', name: 'elsa-other-package' },
			'elsa-infrastructure-package': { context: '/elsa/infrastructure/elsa-infrastructure-package', name: 'elsa-infrastructure-package' },
			'elsa-infrastructure-sub-package': { context: '/elsa/infrastructure/elsa-infrastructure-package/subdir/subpackage', name: 'elsa-infrastructure-sub-package' },
			'elsa-job-package': { context: '/elsa/job/elsa-job-package', name: 'elsa-job-package' },
			'elsa-service-package': { context: '/elsa/service/elsa-service-package', name: 'elsa-service-package' }
		};
		getMock.returns(packageMetadata);
	});

	it('shall return modules and unstructured modules with packages', async function () {
		const modules = getModule();
		assert.deepStrictEqual(modules, [
			{
				name: 'elsa-module',
				location: '/elsa/module/elsa-module',
				packages: [{ name: 'elsa-package', context: 'elsa-package' }]
			},
			{
				name: 'elsa-other-module',
				location: '/elsa/module/elsa-other-module',
				packages: [{ name: 'elsa-other-package', context: 'elsa-other-package' }]
			},
			{
				name: 'infrastructure',
				location: '/elsa/infrastructure',
				packages: [
					{ name: 'elsa-infrastructure-package', context: 'elsa-infrastructure-package' },
					{ name: 'elsa-infrastructure-sub-package', context: 'elsa-infrastructure-package/subdir/subpackage' }
				]
			},
			{
				name: 'job',
				location: '/elsa/job',
				packages: [{ name: 'elsa-job-package', context: 'elsa-job-package' }]
			},
			{
				name: 'service',
				location: '/elsa/service',
				packages: [{ name: 'elsa-service-package', context: 'elsa-service-package' }]
			}
		]);
	});

	it('shall return filter modules and packages when they cannot be found in the workspace', async function () {
		packageMetadata = { 'elsa-package': { context: '/elsa/module/elsa-module/elsa-package', name: 'elsa-package' } };
		getMock.returns(packageMetadata);
		const modules = getModule();
		assert.deepStrictEqual(modules, [
			{
				name: 'elsa-module',
				location: '/elsa/module/elsa-module',
				packages: [{ name: 'elsa-package', context: 'elsa-package' }]
			}
		]);
	});

	it('shall filter for a certain module when a moduleName is passed', async function () {
		const modules = getModule('elsa-module');
		assert.deepStrictEqual(modules, [
			{
				name: 'elsa-module',
				location: '/elsa/module/elsa-module',
				packages: [{ name: 'elsa-package', context: 'elsa-package' }]
			}
		]);
	});

	it('shall pass scopes to get workspace util', async function () {
		getModule('', { affected: true, metadata: true, nx: { targets: { sonar: true } } });
		assert.ok(getMock.calledWith([], { affected: true, metadata: true, nx: { targets: { sonar: true } } }));
	});
});
