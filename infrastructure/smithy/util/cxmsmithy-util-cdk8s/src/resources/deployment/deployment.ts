import { Chart } from 'cdk8s';
import { KubeDeployment, PodAntiAffinity, TopologySpreadConstraint } from '../../imports/k8s';
import { ContainerOptions, createServiceContainer } from './serviceContainer';

export interface DeploymentOptions {
	containerOptions: ContainerOptions[];
	replicas?: number;
	serviceAccountName?: string;
	serviceNames: string[];
}

const defaultLabels: (serviceName: string) => { [key: string]: string } = (serviceName: string) => ({
	app: serviceName,
	logformat: 'json'
});
const defaultAnnotations: () => { [key: string]: string } = () => ({
	'proxy.istio.io/config': 'terminationDrainDuration: 20s'
});
export const defaultPodAntiAffinity: (serviceName: string) => PodAntiAffinity = (serviceName: string) => ({
	preferredDuringSchedulingIgnoredDuringExecution: [
		{
			weight: 100,
			podAffinityTerm: {
				labelSelector: {
					matchLabels: { app: serviceName }
				},
				topologyKey: 'kubernetes.io/hostname'
			}
		}
	]
});
export const defaultTopologySpreadConstraints: (serviceName: string) => TopologySpreadConstraint = (serviceName: string) => ({
	maxSkew: 1,
	topologyKey: 'topology.kubernetes.io/zone',
	whenUnsatisfiable: 'ScheduleAnyway',
	labelSelector: {
		matchLabels: { app: serviceName }
	}
});

export const createDeployment = (chart: Chart, options: DeploymentOptions): KubeDeployment[] => {
	const { containerOptions, replicas, serviceAccountName, serviceNames } = options;
	return serviceNames.map(serviceName => {
		return new KubeDeployment(chart, serviceName + 'deployment', {
			metadata: {
				name: serviceName
			},
			spec: {
				replicas: replicas ?? 2,
				selector: { matchLabels: { app: serviceName } },
				template: {
					metadata: { annotations: defaultAnnotations(), labels: defaultLabels(serviceName) },
					spec: {
						affinity: { podAntiAffinity: defaultPodAntiAffinity(serviceName) },
						topologySpreadConstraints: [defaultTopologySpreadConstraints(serviceName)],
						serviceAccountName: serviceAccountName ?? 'elsa-master-data-svc',
						containers: containerOptions.map(containerOption => createServiceContainer(serviceName, containerOption)),
						imagePullSecrets: [{ name: 'cxm-repo-reader' }, { name: 'sap-c4c-artifactory' }]
					}
				}
			}
		});
	});
};
