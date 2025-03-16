'use strict';

const Task = require('@sapn/elsa-util-task');

module.exports = class Reference {
	static #buffer = new Map();
	#reference;

	constructor(reference) {
		this.#reference = reference;
	}

	get hash() {
		const { code, stdout } = Task.executeSync(`git rev-parse ${this.#reference}`, [], { shell: true, stdio: 'pipe' });
		if (code === 0) {
			if (this.validate(stdout)) {
				return stdout;
			}
		} else {
			return undefined;
		}
	}

	set hash(hash) {
		if (this.validate(hash)) {
			const { code, stderr } = Task.executeSync(`git update-ref ${this.#reference} ${hash}`, [], { shell: true, stdio: 'pipe' });
			if (code !== 0) {
				throw new Error(stderr);
			}
		}
	}

	validate() {
		return true;
	}

	[Symbol.toPrimitive]() {
		return this.#reference;
	}

	static create(reference) {
		if (!Reference.#buffer.has(reference)) {
			Reference.#buffer.set(reference, new Reference(reference));
		}
		return Reference.#buffer.get(reference);
	}
};
