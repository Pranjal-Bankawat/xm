'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('assert');
const { resolve } = require('path');
const sinon = require('sinon');

let Storage, elsadir, storage, fs, os;

describe('configuration/Storage', function () {
	before(function () {
		this.timeout(0);
		fs = {
			accessSync: sinon.stub(),
			readFileSync: sinon.stub(),
			writeFileSync: sinon.stub(),
			mkdirSync: sinon.stub()
		};
		os = {
			homedir: sinon.stub()
		};
		Storage = rewiremock.proxy(() => require('../../src/configuration/Storage'), {
			fs: fs,
			os: os
		});
	});

	beforeEach(function () {
		os.homedir.reset();
		os.homedir.returns('/path/to/homedir');

		fs.accessSync.reset();
		fs.mkdirSync.reset();
		fs.readFileSync.reset();
		fs.writeFileSync.reset();

		storage = {
			read: sinon.stub(),
			write: sinon.stub()
		};
		elsadir = '/path/to/homedir/.elsa';
		storage = new Storage(elsadir);
	});

	describe('#constructor()', function () {
		it('shall throw exception if elsadir is not string', function () {
			assert.throws(() => new Storage(true), /Runtime Exception: elsadir must be string/);
		});
	});

	describe('#read()', function () {
		it('shall throw exception if filename is not string', function () {
			assert.throws(() => storage.read(true), /Runtime Exception: filename must be string/);
		});

		it('shall return return undefined if config file is not accessible', function () {
			fs.accessSync.withArgs(resolve(elsadir, 'someFileName')).throws();
			assert.deepStrictEqual(storage.read('someFileName'), undefined);
		});

		it('shall return return undefined if config file is not readable', function () {
			fs.accessSync.withArgs(resolve(elsadir, 'someFileName')).returns();
			fs.readFileSync.withArgs(resolve(elsadir, 'someFileName')).throws();
			assert.deepStrictEqual(storage.read('someFileName'), undefined);
		});

		it('shall return the config file data', function () {
			fs.accessSync.withArgs(resolve(elsadir, 'someFileName')).returns();
			fs.readFileSync.withArgs(resolve(elsadir, 'someFileName')).returns('someData');
			assert.deepStrictEqual(storage.read('someFileName'), 'someData');
		});
	});

	describe('#write()', function () {
		it('shall throw exception if filename is not string', function () {
			assert.throws(() => storage.write(true), /Runtime Exception: filename must be string/);
		});

		it('shall create the elsadir if not existing', function () {
			fs.accessSync.withArgs(elsadir).throws();
			storage.write('someFileName', 'someData');
			sinon.assert.calledOnce(fs.mkdirSync);
			sinon.assert.calledWith(fs.mkdirSync, elsadir);
		});

		it('shall write the data to the file', function () {
			fs.accessSync.withArgs(elsadir).returns();
			storage.write('someFileName', 'someData');
			sinon.assert.calledOnce(fs.writeFileSync);
			sinon.assert.calledWith(fs.writeFileSync, resolve(elsadir, 'someFileName'), 'someData');
		});
	});

	describe('create()', function () {
		it('shall return instance of Storage', function () {
			assert.strictEqual(Storage.create() instanceof Storage, true);
			sinon.assert.calledOnce(os.homedir);
		});
	});
});
