'use strict';

(async function main() {
	globalThis.BUNDLE_LOAD_START_TIME = Date.now();
	const Service = require('./Service');
	globalThis.BUNDLE_LOAD_END_TIME = Date.now();
	const service = await Service.create();
	await service.start();
})();
