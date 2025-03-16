'use strict';

const Profile = require('../../src/configuration/Profile');
const assert = require('assert');
const sinon = require('sinon');

let filename, profile, storage;

describe('configuration/Profile', function () {
	beforeEach(function () {
		filename = 'someConfigFileName';
		storage = {
			read: sinon.stub(),
			write: sinon.stub()
		};

		profile = new Profile(storage, filename);
	});

	describe('#get()', function () {
		it('shall return undefined if profile does not exist', function () {
			assert.strictEqual(profile.get('invalid'), undefined);
		});

		it('shall return the active profile if no id is provided', function () {
			const config = { profiles: { currentActiveProfile: {} }, active: 'currentActiveProfile' };
			storage.read.returns(JSON.stringify(config));
			assert.deepStrictEqual(profile.get(), config.profiles.currentActiveProfile);
		});

		it('shall return the profile for the provided id', function () {
			const config = { profiles: { requestedProfile: {} }, active: 'currentActiveProfile' };
			storage.read.withArgs(filename).returns(JSON.stringify(config));
			assert.deepStrictEqual(profile.get('requestedProfile'), config.profiles.requestedProfile);
		});
	});

	describe('#set()', function () {
		it('shall assert if id is not string', function () {
			assert.throws(() => profile.set(true, {}), /Runtime Exception: id must be string/);
		});

		it('shall assert profile id is not object', function () {
			assert.throws(() => profile.set('someId', true), /Runtime Exception: profile must be object/);
		});

		it('shall set the profile', function () {
			const config = { profiles: {}, active: '' };
			storage.read.withArgs(filename).returns(JSON.stringify(config));
			profile.set('someId', { tenantId: 'someTenantId' });
			sinon.assert.calledOnce(storage.read);
			sinon.assert.calledWith(storage.read, filename);
			sinon.assert.calledOnce(storage.write);
			sinon.assert.calledWith(
				storage.write,
				filename,
				JSON.stringify(
					{
						profiles: { someId: { tenantId: 'someTenantId' } },
						active: ''
					},
					null,
					'\t'
				)
			);
		});
	});

	describe('#tenants', function () {
		it('shall return list of available tenants', function () {
			const config = {
				profiles: {
					someProfile: {
						tenantId: '666'
					},
					otherProfile: {
						tenantId: '999'
					}
				},
				active: '666'
			};

			storage.read.withArgs(filename).returns(JSON.stringify(config));
			assert.deepStrictEqual(profile.tenants, ['666', '999']);
		});

		it('shall return an empty array when there are no profiles available', function () {
			const config = { profiles: {}, active: '' };
			storage.read.withArgs(filename).returns(JSON.stringify(config));
			assert.deepStrictEqual(profile.tenants, []);
		});
	});

	describe('#active', function () {
		it('shall return the empty default active profile id', function () {
			const config = { profiles: {}, active: '' };
			storage.read.withArgs(filename).returns(JSON.stringify(config));
			assert.strictEqual(profile.active, '');
		});

		it('shall assert active profile id', function () {
			const config = { profiles: {}, active: 'someId' };
			storage.read.withArgs(filename).returns(JSON.stringify(config));
			assert.strictEqual(profile.active, 'someId');
		});

		it('shall throw exception if active profile to be set is not string', function () {
			assert.throws(() => (profile.active = true), /Runtime Exception: id must be string/);
		});

		it('shall set the active profile id', function () {
			const config = { profiles: {}, active: '' };
			storage.read.withArgs(filename).returns(JSON.stringify(config));
			profile.active = 'someNewID';
			sinon.assert.calledOnce(storage.write);
			sinon.assert.calledWith(
				storage.write,
				filename,
				JSON.stringify(
					{
						profiles: {},
						active: 'someNewID'
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
			assert.deepStrictEqual(profile.read(), { profiles: {}, active: '' });
		});

		it('shall return empty default configuration if read returns undefined', function () {
			const config = { profiles: { someId: {} }, active: 'someId' };
			storage.read.withArgs(filename).returns(JSON.stringify(config));
			assert.deepStrictEqual(profile.read(), { profiles: { someId: {} }, active: 'someId' });
		});
	});

	describe('#write()', function () {
		it('shall throw exception if data is not object', function () {
			assert.throws(() => profile.write(false), /data must be object/);
		});

		it('shall throw exception if data.active is not string', function () {
			assert.throws(() => profile.write({ profiles: {}, active: true }), /data\.active must be string/);
		});

		it('shall throw exception if data.profiles is not object', function () {
			assert.throws(() => profile.write({ profiles: true, active: 'someId' }), /data\.profiles must be object/);
		});

		it('shall return empty default configuration if read returns undefined', function () {
			const config = { profiles: { someId: {} }, active: 'someId' };
			profile.write(config);
			sinon.assert.calledWith(
				storage.write,
				filename,
				JSON.stringify(
					{
						profiles: { someId: {} },
						active: 'someId'
					},
					null,
					'\t'
				)
			);
		});
	});

	describe('create()', function () {
		it('shall return instance of Profile', function () {
			assert.strictEqual(Profile.create(storage) instanceof Profile, true);
		});
	});

	describe('remove()', function () {
		it('shall remove tenants from profile', function () {
			const config = {
				profiles: {
					666: {
						tenantId: '666'
					},
					999: {
						tenantId: '999'
					},
					333: {
						tenantId: '333'
					}
				},
				active: '666'
			};
			storage.read.withArgs(filename).returns(JSON.stringify(config));

			profile.remove(['999', '333']);

			sinon.assert.calledWith(
				storage.write,
				filename,
				JSON.stringify(
					{
						profiles: { 666: { tenantId: '666' } },
						active: '666'
					},
					null,
					'\t'
				)
			);
		});
	});
});
