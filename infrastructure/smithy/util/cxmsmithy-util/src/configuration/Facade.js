'use strict';

const Storage = require('./Storage');
const Profile = require('./Profile');
const AWS = require('./AWS');
const assert = require('assert');

module.exports = class Facade {
	#aws;
	#profile;

	constructor({ aws, profile }) {
		assert(typeof aws === 'object', 'Runtime Exception: configuration.aws must be object');
		assert(typeof profile === 'object', 'Runtime Exception: configuration.profile must be object');
		this.#aws = aws;
		this.#profile = profile;
	}

	get aws() {
		return this.#aws;
	}

	get profile() {
		return this.#profile;
	}

	static create() {
		const storage = Storage.create();
		const profile = Profile.create(storage);
		const aws = AWS.create(storage);
		return new Facade({ profile, aws });
	}
};
