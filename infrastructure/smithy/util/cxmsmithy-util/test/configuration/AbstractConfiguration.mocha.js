'use strict';

const AbstractConfiguration = require('../../src/configuration/AbstractConfiguration');
const assert = require('assert');
const sinon = require('sinon');

class Configuration extends AbstractConfiguration {}

describe('configuration/AbstractConfiguration', function () {
	let storage, filename, configuration;

	beforeEach(function () {
		storage = {
			read: sinon.stub(),
			write: sinon.stub()
		};
		filename = 'filename';
		configuration = new Configuration(storage, filename);
	});

	describe('#constructor()', function () {
		it('shall throw exception if abstract constructor is invoked', function () {
			assert.throws(() => new AbstractConfiguration(), /RuntimeException: Invoking Abstract Constructor/);
		});

		it('shall throw exception if storage is not object', function () {
			assert.throws(() => new Configuration(true), /Runtime Exception: storage must be object/);
		});

		it('shall throw exception if type of filename is not string', function () {
			assert.throws(() => new Configuration(storage, true), /Runtime Exception: filename must be string/);
		});
	});

	describe('#read()', function () {
		it('shall delegate to the storage read', function () {
			configuration.read();
			sinon.assert.calledOnce(storage.read);
			sinon.assert.calledWith(storage.read, filename);
		});
	});

	describe('#write()', function () {
		it('shall delegate to the storage write', function () {
			const data = { test: 'configuration' };
			configuration.write(data);
			sinon.assert.calledOnce(storage.write);
			sinon.assert.calledWith(storage.write, filename, data);
		});
	});

	describe('create()', function () {
		it('shall create instance of AbstractConfiguration', function () {
			assert.strictEqual(Configuration.create(storage, filename) instanceof AbstractConfiguration, true);
		});
	});
});
