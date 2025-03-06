'use strict';

const DeploymentPhaseCode = require('@sapn/elsa-deployment-api/DeploymentPhaseCode');
const DeploymentTypeCode = require('@sapn/elsa-deployment-api/DeploymentTypeCode');
const Feature = require('@sapn/config/Feature');
const environment = require('@sapn/environment');
const config = require('@sapn/elsa/manifest/config');

const manifest = { ...config({ environment }) };

const deploymentRegistry = {
	setup: [],
	teardown: []
};

const deployment = {};
Object.defineProperty(deployment, 'type', { enumerable: true, value: DeploymentTypeCode.get(Feature.get('DEPLOYMENT_TYPE')) });
Object.defineProperty(deployment, 'phase', { enumerable: true, value: DeploymentPhaseCode.get(Feature.get('DEPLOYMENT_PHASE')) });
Object.defineProperty(deployment, 'tasks', {
	enumerable: true,
	get() {
		switch (deployment.phase) {
			case DeploymentPhaseCode.SETUP:
				return deploymentRegistry.setup;
			case DeploymentPhaseCode.TEARDOWN:
				return deploymentRegistry.teardown;
			default:
				return [];
		}
	}
});
Object.defineProperty(manifest, 'deployment', { enumerable: true, value: deployment });

const compressionFactory = require('compression');
const helmetFactory = require('helmet');
const apiRegistry = {
	event: [],
	grpc: [],
	rest: [
		['compression', compressionFactory],
		['helmet', () => helmetFactory({ crossOriginEmbedderPolicy: false })]
	]
};
const profile = {};
Object.defineProperty(profile, 'branding', { enumerable: true, value: {} });
Object.defineProperty(profile, 'api', {
	enumerable: true,
	get() {
		switch (deployment.type) {
			case DeploymentTypeCode.EVENT_CONSUMER:
				return apiRegistry.event;
			case DeploymentTypeCode.GRPC:
				return apiRegistry.grpc;
			case DeploymentTypeCode.REST:
				return apiRegistry.rest;
			default:
				return [];
		}
	}
});
Object.defineProperty(manifest, 'profile', { enumerable: true, value: profile });

module.exports = manifest;
