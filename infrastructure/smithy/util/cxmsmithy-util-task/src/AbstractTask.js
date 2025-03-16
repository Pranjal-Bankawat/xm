'use strict';

const assert = require('assert');
const process = require('node:process');

const getuid = () => (process.platform === 'win32' ? undefined : process.getuid());
const getgid = () => (process.platform === 'win32' ? undefined : process.getgid());
const types = ['string', 'number', 'boolean'];

const properties = new WeakMap();

module.exports = class AbstractTask {
	constructor(command, args, { cwd = process.cwd(), env = process.env, uid = getuid(), gid = getgid(), stdio = 'inherit', shell = false, ...options } = {}) {
		assert(typeof command !== 'undefined', 'Missing Mandatory Attribute: command must be provided');
		assert(typeof command === 'string', 'Invalid Argument Type: command must be string');
		assert(
			typeof args === 'undefined' || (Array.isArray(args) && args.every(arg => types.includes(typeof arg))),
			'Invalid Argument Type: args must be [String|Number|Boolean]'
		);
		assert(typeof cwd === 'undefined' || typeof cwd === 'string', 'Invalid Argument Type: options.cwd must be strings');
		assert(typeof env === 'undefined' || typeof env === 'object', 'Invalid Argument Type: options.env must be object');
		assert(typeof uid === 'undefined' || typeof uid === 'number', 'Invalid Argument Type: options.uid must be number');
		assert(typeof gid === 'undefined' || typeof gid === 'number', 'Invalid Argument Type: options.gid must be number');
		assert(typeof stdio === 'undefined' || /string|object/.test(typeof stdio), 'Invalid Argument Type: options.stdio must be string or object');
		assert(typeof shell === 'boolean', 'Invalid Argument Type: options.shell must be boolean');

		properties.set(this, { command, args, options: { cwd, env, uid, gid, stdio, shell, ...options } });
	}

	get command() {
		return this.platform === 'win32' ? process.env.comspec : properties.get(this).command;
	}

	get args() {
		return this.platform === 'win32' ? ['/c', properties.get(this).command, ...properties.get(this).args] : properties.get(this).args;
	}

	get options() {
		return properties.get(this).options;
	}

	get platform() {
		return process.platform;
	}

	run() {
		throw new Error('Runtime Exception: Invoking Abstract Method');
	}

	static create(command, args, options) {
		return new this(command, args, options);
	}

	static execute(command, args, options) {
		return this.create(command, args, options).run();
	}
};
