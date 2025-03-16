'use strict';

const assert = require('assert');
const AbstractConfiguration = require('./AbstractConfiguration');
const filename = 'profile.json';
const defaults = ({ profiles = {}, active = '' }) => ({ profiles, active });

module.exports = class Profile extends AbstractConfiguration {
	get(id) {
		const { profiles, active } = this.read();
		return profiles[id || active];
	}

	set(id, profile) {
		assert(typeof id === 'string', 'Runtime Exception: id must be string');
		assert(typeof profile === 'object', 'Runtime Exception: profile must be object');
		const { profiles, active } = this.read();
		profiles[id] = profile;
		this.write({ profiles, active });
	}

	get tenants() {
		const profiles = this.read().profiles;
		const tenantIds = [];

		for (const profile in profiles) {
			tenantIds.push(profiles[profile].tenantId);
		}

		return tenantIds;
	}

	get active() {
		return this.read().active;
	}

	set active(id) {
		assert(typeof id === 'string', 'Runtime Exception: id must be string');
		const { profiles } = this.read();
		this.write({ profiles, active: id });
	}

	remove(ids) {
		const { profiles, active } = this.read();

		for (const id of ids) {
			delete profiles[id];
		}

		this.write({ profiles, active });
	}

	read() {
		return defaults(JSON.parse(super.read() || '{}'));
	}

	write(data) {
		assert(typeof data === 'object', 'Runtime Exception: data must be object');
		const { profiles, active } = defaults(data);
		assert(typeof active === 'string', 'data.active must be string');
		assert(typeof profiles === 'object', 'data.profiles must be object');
		//TODO further validate profile;
		return super.write(JSON.stringify({ profiles, active }, null, '\t'));
	}

	static create(storage) {
		return super.create(storage, filename);
	}
};
