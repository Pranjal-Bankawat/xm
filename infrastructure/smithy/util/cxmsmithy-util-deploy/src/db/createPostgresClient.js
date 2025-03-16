'use strict';

const { Client } = require('pg');
const { PGHOST: host = '127.0.0.1', PGPORT: port = 5432 } = require('@sapn/environment');

module.exports = function createPostgresClient() {
	return new Client({ user: 'elsa', host, port });
};
