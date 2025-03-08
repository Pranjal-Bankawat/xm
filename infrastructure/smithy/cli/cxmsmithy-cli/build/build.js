'use strict';

module.exports = {
	command: 'build <command>',
	describe: 'build commands',
	builder: yargs => yargs.usage('build <command>').command(require('./bundle')).command(require('./service')).demandCommand(1)
};
