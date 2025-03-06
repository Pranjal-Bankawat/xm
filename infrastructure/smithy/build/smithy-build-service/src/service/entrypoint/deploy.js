'use strict';
(async function main() {
	const Service = require('./Service');
	const service = await Service.create();
	await service.deploy();
})();
