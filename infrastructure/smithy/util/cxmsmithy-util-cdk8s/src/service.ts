import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { createDeployment, DeploymentOptions } from './resources/deployment/deployment';

export interface ServiceOptions {
	appName: string;
	namespace?: string;
	deploymentOptions: DeploymentOptions;
}

export class BaseServiceChart extends Chart {
	constructor(scope: Construct, filename: string, serviceOptions: ServiceOptions) {
		const { deploymentOptions, namespace } = serviceOptions;
		super(scope, filename, { disableResourceNameHashes: true, namespace });

		createDeployment(this, deploymentOptions);

		// TODO: Create K8sService
		// TODO: Create HPAOptions
		// TODO: Create AmbassadorMappingOptions
	}
}

export default { BaseServiceChart };
