'use strict';

const rewiremock = require('rewiremock').default;
const assert = require('assert');
const sinon = require('sinon');
const { resolve } = require('path');
const requireModule = require('../src/requireModule');

describe('requireModule', function () {
	let cjsModulePath;
	let esModulePath;
	let console;

	before(function () {
		cjsModulePath = resolve(__dirname, '../../cjs.js');
		esModulePath = resolve(__dirname, '../../esm.js');

		rewiremock.enable();
		rewiremock(resolve(__dirname, '../../cjs.js')).with({ name: 'theCommonJModule' });
		rewiremock(resolve(__dirname, '../../esm.js')).with({ default: { name: 'theESModule' }, __esModule: true });
	});

	after(function () {
		rewiremock.disable();
	});

	beforeEach(function () {
		console = {
			log: sinon.stub()
		};
	});

	it('shall load Common JS modules', function () {
		assert.strictEqual(requireModule(cjsModulePath, console).name, 'theCommonJModule');
		sinon.assert.calledOnce(console.log);
	});

	it('shall load ES modules', function () {
		assert.strictEqual(requireModule(esModulePath, console).name, 'theESModule');
		sinon.assert.calledOnce(console.log);
	});
});
