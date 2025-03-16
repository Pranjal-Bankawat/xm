'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const { resolve } = require('path');

module.exports = class Storage {
	#elsadir;

	constructor(elsadir) {
		assert(typeof elsadir === 'string', 'Runtime Exception: elsadir must be string');
		this.#elsadir = elsadir;
	}

	read(filename) {
		assert(typeof filename === 'string', 'Runtime Exception: filename must be string');
		try {
			const path = resolve(this.#elsadir, filename);
			fs.accessSync(path);
			return fs.readFileSync(path, { encoding: 'utf8' });
		} catch (err) {
			return undefined;
		}
	}

	write(filename, data) {
		assert(typeof filename === 'string', 'Runtime Exception: filename must be string');
		this._createElsaDir();
		const path = resolve(this.#elsadir, filename);
		fs.writeFileSync(path, data, { encoding: 'utf8' });
	}

	_createElsaDir() {
		try {
			fs.accessSync(this.#elsadir);
		} catch (err) {
			fs.mkdirSync(this.#elsadir, { recursive: true });
		}
	}

	static create() {
		const homedir = os.homedir();
		const elsadir = resolve(homedir, '.elsa');
		return new Storage(elsadir);
	}
};
