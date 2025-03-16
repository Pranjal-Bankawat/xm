'use strict';

const Branch = require('./Branch');
const Repository = require('./Repository');
const Reference = require('./Reference');

const HEAD = Reference.create('HEAD');
const Current = Branch.create(HEAD);

Object.assign(module.exports, {
	Branch,
	Current,
	HEAD,
	Reference,
	Repository
});
