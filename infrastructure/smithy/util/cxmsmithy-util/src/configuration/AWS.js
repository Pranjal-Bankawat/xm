'use strict';

const assert = require('assert');
const AbstractConfiguration = require('./AbstractConfiguration');
const filename = 'aws.json';
const defaults = ({ mfa = {} }) => ({ mfa });

module.exports = class AWS extends AbstractConfiguration {
	get mfa() {
		return this.read().mfa;
	}

	set mfa(mfa) {
		assert(typeof mfa === 'object', 'Runtime Exception: mfa must be object');
		this.write({ mfa });
	}

	read() {
		return defaults(JSON.parse(super.read() || '{}'));
	}

	write(data) {
		assert(typeof data === 'object', 'Runtime Exception: data must be object');
		const { mfa } = defaults(data);
		assert(typeof mfa === 'object', 'data.mfa must be object');
		//TODO further validate profile;
		return super.write(JSON.stringify({ mfa }, null, '\t'));
	}

	static create(storage) {
		return super.create(storage, filename);
	}
};
