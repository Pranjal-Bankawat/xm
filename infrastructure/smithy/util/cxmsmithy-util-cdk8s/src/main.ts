import { App } from 'cdk8s';
import { BaseServiceChart } from './service';

export interface ServiceOptions {
	image: string;
	ports: number[];
	namespace?: string;
}

export const createServiceManifest = (appName: string, serviceOptions: ServiceOptions) => {
	const app = new App();
	initializeBaseChart(app, appName, serviceOptions);

	return app.synthYaml();
};

export { Quantity, IntOrString } from './imports/k8s';

const initializeBaseChart = (app: App, appName: string, serviceOptions: ServiceOptions) => {
	const { image, ports, namespace } = serviceOptions;
	return new BaseServiceChart(app, appName, {
		appName,
		namespace,
		deploymentOptions: {
			containerOptions: [
				{
					image,
					name: appName,
					ports: ports.map(port => ({ containerPort: port }))
				}
			]
		}
		// TODO: K8sServiceOptions
		// TODO: HPAOptions
		// TODO: AmbassadorMappingOptions
	});
};
