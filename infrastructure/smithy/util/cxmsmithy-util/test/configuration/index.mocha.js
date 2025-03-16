'use strict';

const configuration = require('../../src/configuration/index');
const Facade = require('../../src/configuration/Facade');
const assert = require('assert');

describe('configuration/index', function () {
	it('shall return instance if Facade', function () {
		assert.strictEqual(configuration instanceof Facade, true);
	});
});
