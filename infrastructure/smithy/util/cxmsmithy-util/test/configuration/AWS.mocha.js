'use strict';

const AWS = require('../../src/configuration/AWS');
const assert = require('assert');
const sinon = require('sinon');

let filename, aws, storage;

describe('configuration/AWS', function () {
	beforeEach(function () {
		filename = 'someConfigFileName';
		storage = {
			read: sinon.stub(),
			write: sinon.stub()
		};

		aws = new AWS(storage, filename);
	});

	describe('#mfa', function () {
		it('shall return mfa configuration', function () {
			const config = { mfa: 'configuration' };
			storage.read.withArgs(filename).returns(JSON.stringify(config));
			assert.strictEqual(aws.mfa, config.mfa);
		});

		it('shall throw exception if mfa is not object', function () {
			assert.throws(() => (aws.mfa = true), /Runtime Exception: mfa must be object/);
		});

		it('shall set the mfa configuration', function () {
			const config = {};
			storage.read.withArgs(filename).returns(JSON.stringify(config));
			aws.mfa = {
				resource: 'someResource'
			};
			sinon.assert.calledOnce(storage.write);
			sinon.assert.calledWith(
				storage.write,
				filename,
				JSON.stringify(
					{
						mfa: {
							resource: 'someResource'
						}
					},
					null,
					'\t'
				)
			);
		});
	});

	describe('#read()', function () {
		it('shall return empty default configuration if read returns undefined', function () {
			storage.read.returns(undefined);
			assert.deepStrictEqual(aws.read(), { mfa: {} });
		});

		it('shall return stored configuration', function () {
			const config = { mfa: { resource: 'someResource' } };
			storage.read.withArgs(filename).returns(JSON.stringify(config));
			assert.deepStrictEqual(aws.read(), { mfa: { resource: 'someResource' } });
		});
	});

	describe('#write()', function () {
		it('shall throw exception if data is not object', function () {
			assert.throws(() => aws.write(false), /data must be object/);
		});

		it('shall throw exception if data.mfa is not object', function () {
			assert.throws(() => aws.write({ mfa: true }), /data\.mfa must be object/);
		});

		it('shall return empty default configuration if read returns undefined', function () {
			const config = { mfa: { resource: 'someResource' } };
			aws.write(config);
			sinon.assert.calledWith(
				storage.write,
				filename,
				JSON.stringify(
					{
						mfa: { resource: 'someResource' }
					},
					null,
					'\t'
				)
			);
		});
	});

	describe('create()', function () {
		it('shall return instance of AWS', function () {
			assert.strictEqual(AWS.create(storage) instanceof AWS, true);
		});
	});
});
