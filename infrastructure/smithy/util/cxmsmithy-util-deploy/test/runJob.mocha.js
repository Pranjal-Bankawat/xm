'use strict';

const rewiremock = require('rewiremock').default;
const sinon = require('sinon');

let process, Job, job;

describe('runJob', function () {
	beforeEach(function () {
		delete require.cache[require.resolve('../src/runJob')];
		process = { argv: ['node', 'script', 'someJobName'] };
		rewiremock('node:process').with(process);
		job = { run: sinon.stub() };
		Job = { create: sinon.stub().resolves(job) };
		rewiremock('someJobName/bundle').with(Job);
		rewiremock.enable();
	});

	afterEach(function () {
		rewiremock.disable();
	});

	it('shall load and run the job', async function () {
		process.argv.push(JSON.stringify([]));
		await require('../src/runJob');
		sinon.assert.calledOnce(job.run);
	});

	it('shall parse and pass the args to the job runner', async function () {
		const args = ['arg1'];
		process.argv.push(JSON.stringify(args));
		await require('../src/runJob');
		sinon.assert.calledOnce(job.run);
	});
});
