'use strict';

const AsyncTask = require('./AsyncTask');
const SyncTask = require('./SyncTask');

Object.assign(module.exports, {
	async execute() {
		return AsyncTask.execute(...arguments);
	},

	executeSync() {
		return SyncTask.execute(...arguments);
	}
});
