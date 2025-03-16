import { Chart } from 'cdk8s';
import { IntOrString, KubeService } from '../../imports/k8s';
const mappedServiceName = {
	'elsa-web-batch': 'elsa-web-svc'
};
export interface K8sServiceOptions {
	serviceNames: string[];
	ports: port[];
}

export interface port {
	name: string;
	containerPort: number;
}

export const isHttpService: (serviceName: string) => boolean = serviceName => {
	return !serviceName.endsWith('grpc');
};

export const createService = (chart: Chart, options: K8sServiceOptions): KubeService[] => {
	const { serviceNames, ports } = options;

	return serviceNames.map(serviceName => {
		return new KubeService(chart, serviceName + '-svc', {
			metadata: {
				name: mappedServiceName[serviceName] ?? serviceName + '-svc'
			},
			spec: {
				ports: [
					{
						name: isHttpService(serviceName) ? ports[0].name : ports[1].name,
						port: isHttpService(serviceName) ? ports[0].containerPort : ports[1].containerPort,
						targetPort: IntOrString.fromNumber(isHttpService(serviceName) ? ports[0].containerPort : ports[1].containerPort)
					}
				],
				selector: {
					app: serviceName
				},
				type: 'ClusterIP'
			}
		});
	});
};
