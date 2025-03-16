'use strict';

module.exports = function requireModule(absoluteModulePath, console) {
	const start = Date.now();
	const Module = require(absoluteModulePath);

	console.log(`Module ${absoluteModulePath} loaded and took ${Date.now() - start}ms`);

	return Module.__esModule ? Module.default : Module;
};
