'use strict';

const { resolve } = require('node:path');

module.exports = {
	env: {
		node: true
	},
	extends: ['plugin:@sapn/elsa/infrastructure', 'plugin:node/recommended'],
	ignorePatterns: ['src/imports/**'],
	parserOptions: {
		project: [resolve(__dirname, './tsconfig.eslint.json')],
		createDefaultProgram: true
	},
	overrides: [
		{
			extends: ['plugin:@typescript-eslint/disable-type-checked'],
			files: ['.eslintrc.js', 'esbuild.config.js', 'mocha.tsconfig.js', 'stryker.conf.js', 'jest.config.js', '**/*.spec.ts']
		},
		{
			files: ['package.json'],
			rules: {
				'@nx/nx-plugin-checks': 'error',
				'@sapn/elsa/package/require-lifecycle-scripts': 'off'
			}
		},
		{
			files: ['**/*.{js,ts}', '**/*__template__'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 2018,
				sourceType: 'module'
			},
			rules: {
				'node/no-unpublished-import': 'off',
				'node/no-unpublished-require': 'off',
				'node/no-missing-require': 'off',
				'node/no-missing-import': 'off',
				'node/no-extraneous-require': 'off',
				'node/no-extraneous-import': 'off',
				'no-undef': 'off',
				'node/no-unsupported-features/es-syntax': 'off',
				'node/no-unsupported-features/node-builtins': ['off', { version: '>=16.18.0' }],
				'node/no-unsupported-features/es-builtins': ['off', { version: '>=16.18.0' }]
			}
		},
		{
			files: ['*.spec.ts'],
			rules: {
				'no-restricted-imports': [
					'warn',
					{
						paths: [
							{
								name: 'rewiremock',
								message: 'Please use jest framework instead.'
							},
							{
								name: 'rewiremock/node',
								message: 'Please use jest framework instead.'
							}
						]
					}
				]
			}
		}
	]
};
