'use strict';

const assert = require('assert');
const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

let AWS, Facade, Storage, Profile, aws, storage, profile, facade;

describe('configuration/Facade', function () {
	before(function () {
		this.timeout(0);
		Storage = { create: sinon.stub() };
		Profile = { create: sinon.stub() };
		AWS = { create: sinon.stub() };
		Facade = rewiremock.proxy(() => require('../../src/configuration/Facade'), {
			[require.resolve('../../src/configuration/Storage')]: Storage,
			[require.resolve('../../src/configuration/AWS')]: AWS,
			[require.resolve('../../src/configuration/Profile')]: Profile
		});
	});

	beforeEach(function () {
		storage = {};
		Storage.create.reset();
		Storage.create.returns(storage);

		aws = {};
		AWS.create.reset();
		AWS.create.withArgs(storage).returns(aws);

		profile = {};
		Profile.create.reset();
		Profile.create.withArgs(storage).returns(profile);

		facade = new Facade({ aws, profile });
	});

	describe('#constructor()', function () {
		it('shall throw exception if configuration.aws is not object', function () {
			assert.throws(() => new Facade({ aws: true, profile }), /Runtime Exception: configuration.aws must be object/);
		});

		it('shall throw exception if configuration.profile is not object', function () {
			assert.throws(() => new Facade({ aws, profile: true }), /Runtime Exception: configuration.profile must be object/);
		});
	});

	describe('#aws', function () {
		it('shall return the created profile', function () {
			assert.strictEqual(facade.aws, aws);
		});
	});

	describe('#profile', function () {
		it('shall return the created profile', function () {
			assert.strictEqual(facade.profile, profile);
		});
	});

	describe('create()', function () {
		it('shall create instance of facade', function () {
			assert.strictEqual(Facade.create() instanceof Facade, true);
			sinon.assert.calledOnce(Storage.create);
			sinon.assert.calledOnce(AWS.create);
			sinon.assert.calledWith(AWS.create, storage);
			sinon.assert.calledOnce(Profile.create);
			sinon.assert.calledWith(Profile.create, storage);
		});
	});
});
