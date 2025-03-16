'use strict';

const assert = require('assert');
const nodeProcess = require('node:process');

function checkEnvironmentVariableByName(environmentVariableName) {
	assert(nodeProcess.env[environmentVariableName], `ERROR: Environment variable "${environmentVariableName}" is not set.`);
	return nodeProcess.env[environmentVariableName].trim();
}

Object.assign(module.exports, {
	checkEnvironmentVariableByName
});
