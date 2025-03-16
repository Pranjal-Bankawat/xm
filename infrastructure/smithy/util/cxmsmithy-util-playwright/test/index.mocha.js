'use strict';

const sinon = require('sinon');
const hello = require('../src');

describe('index', function () {
	before(function () {
		sinon.stub(console, 'log');
	});

	beforeEach(function () {
		console.log.reset();
	});

	after(function () {
		console.log.restore();
	});

	it('Hello World!', function () {
		hello();
		sinon.assert.calledOnce(console.log);
		sinon.assert.calledWith(console.log, 'Hello World!');
	});
});
