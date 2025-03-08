#!/usr/bin/env node

const process = require('node:process');
const smithy = require('yargs').usage('Usage: smithy <command>');

const { commands } = require('../cli.json');
for (const command of commands) {
	try {
		smithy.command(require(command.import));
	} catch (err) {
		process.stderr.write(`Runtime Exception: could not load command ${command}\nException: ${err}`);
	}
}

smithy
	.demandCommand(1)
	.strict()
	.help('h')
	.options({
		verbose: {
			alias: 'v',
			type: 'boolean',
			description: 'Run with verbose logging',
			default: false
		}
	})
	.alias('h', 'help').argv;
