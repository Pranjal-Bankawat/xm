'use strict';

const { name: displayName } = require('./package.json');

module.exports = {
	displayName,
	coverageReporters: [['text', { skipFull: true }], 'cobertura', ['lcov', { projectRoot: __dirname }]],
	coveragePathIgnorePatterns: ['<rootDir>/src/imports/k8s.ts'],
	collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/src/index.ts', '!**/node_modules/**', '!<rootDir>/**/*.d.ts', '!<rootDir>/**/*.d.ts', '!<rootDir>/dist/**'],
	preset: '@sapn/elsa-test/jest/preset/nx',
	transform: {
		'^.+\\.(t|j)sx?$': '@swc/jest'
	}
};
