const { checkEnvironmentVariableByName } = require('../src/environment');
const assert = require('assert');
const nodeProcess = require('node:process');

describe('environment', function () {
	it('shall check an environment variable and return it if it exists', function () {
		const envVarValue = 'some environment variable';
		const envVarName = 'CHECK_ENVVAR';
		nodeProcess.env[envVarName] = envVarValue;

		const retrievedEnvVar = checkEnvironmentVariableByName(envVarName);

		assert.strictEqual(retrievedEnvVar, envVarValue);
	});

	it('shall throw if the specified environment variable does not exist', function () {
		const envVarName = 'DOES_NOT_EXIST';
		delete nodeProcess.env[envVarName];

		assert.throws(() => checkEnvironmentVariableByName(envVarName), { message: 'ERROR: Environment variable "DOES_NOT_EXIST" is not set.' });
	});
});
