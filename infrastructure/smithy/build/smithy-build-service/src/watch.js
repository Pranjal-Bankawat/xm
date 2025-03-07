'use strict';

const esbuild = require('esbuild');

module.exports = async function watch({ config }) {
	return Promise.all(
		config.map(async config => {
			const esbuildContext = await esbuild.context(config);
			await esbuildContext.watch();
			return esbuildContext;
		})
	);
};
