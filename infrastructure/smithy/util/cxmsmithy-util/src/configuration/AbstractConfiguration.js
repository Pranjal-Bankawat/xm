'use strict';

const assert = require('assert');

module.exports = class AbstractConfiguration {
	#storage;
	#filename;

	constructor(storage, filename) {
		assert(this.constructor !== AbstractConfiguration, 'RuntimeException: Invoking Abstract Constructor');
		assert(typeof storage === 'object', 'Runtime Exception: storage must be object');
		assert(typeof filename === 'string', 'Runtime Exception: filename must be string');
		this.#storage = storage;
		this.#filename = filename;
	}

	read() {
		return this.#storage.read(this.#filename);
	}

	write(data) {
		return this.#storage.write(this.#filename, data);
	}

	static create() {
		return new this(...arguments);
	}
};
