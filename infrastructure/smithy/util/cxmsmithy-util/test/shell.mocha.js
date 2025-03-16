'use strict';

const assert = require('assert');
const shell = require('../src/shell');

describe('shell', function () {
	describe('escapeSpecialCharactersForShell()', function () {
		it('shall escape backslash \\', function () {
			const stringWithBackslash = 'some\\str\\ing';
			const escaped = shell.escapeSpecialCharactersForShell(stringWithBackslash);
			assert.strictEqual(escaped, 'some\\\\str\\\\ing');
		});

		it('shall escape exclamation mark !', function () {
			const stringWithExclamationMark = 'some!str!ing';
			const escaped = shell.escapeSpecialCharactersForShell(stringWithExclamationMark);
			assert.strictEqual(escaped, 'some\\!str\\!ing');
		});

		it('shall escape dollar sign $', function () {
			const stringWithDollarSign = 'some$str$ing';
			const escaped = shell.escapeSpecialCharactersForShell(stringWithDollarSign);
			assert.strictEqual(escaped, 'some\\$str\\$ing');
		});

		it('shall escape all special characters', function () {
			const stringWithSpecialCharacters = 'some$str\\ing!';

			const escaped = shell.escapeSpecialCharactersForShell(stringWithSpecialCharacters);

			assert.strictEqual(escaped, 'some\\$str\\\\ing\\!');
		});
	});
});
