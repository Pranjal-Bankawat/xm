'use strict';

module.exports = function transformDataToDBFormat(data) {
	const mappedData = {};
	for (const [key, value] of Object.entries(data)) {
		mappedData[key] = {
			value
		};
	}
	return mappedData;
};
