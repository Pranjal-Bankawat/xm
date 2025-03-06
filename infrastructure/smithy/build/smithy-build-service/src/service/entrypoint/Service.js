'use strict';

const Deployment = require('@sapn/elsa-deployment');
const DeploymentTypeCode = require('@sapn/elsa-deployment-api/DeploymentTypeCode');
const AbstractService = require('@sapn/elsa/service/AbstractService');
const RestServer = require('@sapn/elsa/server/express/Server');
const GRPCServer = require('@sapn/elsa/server/grpc/Server');
const env = require('@sapn/environment');

const scope = require('elsa/scope');
const manifest = require('elsa/manifest');

/**
 * Elastic Service Architecture Service
 * @extends AbstractService
 * @abstract
 * @class Service
 */
class Service extends AbstractService {}

/**
 * Create an ELSA instance based on the deployment type.
 * @returns {Promise<Deployment|Service>}
 */
module.exports = class ELSA {
	static async create() {
		const host = env.HOST ?? '0.0.0.0';
		switch (manifest.deployment.type) {
			case DeploymentTypeCode.DEPLOYMENT: {
				scope.plugins.push(require('./metadata/elsa.provisioning.js'));
				scope.plugins.push(require('./metadata/elsa.runtime.js'));
				return Deployment.create({ manifest, scope });
			}
			case DeploymentTypeCode.EVENT_CONSUMER:
			case DeploymentTypeCode.GRPC: {
				scope.plugins.push(require('./metadata/elsa.runtime.js'));
				manifest.profile.server = { host, port: env.PORT ?? 50051 };
				return Service.create({ manifest, scope, Server: GRPCServer });
			}
			case DeploymentTypeCode.REST:
			default: {
				scope.plugins.push(require('./metadata/elsa.runtime.js'));
				manifest.profile.server = { http: { host, port: env.PORT ?? 8080 } };
				return Service.create({ manifest, scope, Server: RestServer });
			}
		}
	}
};
