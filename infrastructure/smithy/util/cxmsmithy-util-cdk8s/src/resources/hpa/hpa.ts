import { KubeHorizontalPodAutoscalerV2, MetricSpecV2 } from '../../imports/k8s';
import { Chart } from 'cdk8s';
import { HorizontalPodAutoscalerBehaviorV2 } from '../../imports/k8s';

export interface HpaOptions {
	serviceNames: string[];
	apiVersion?: string;
	maxReplicas: number;
	minReplicas?: number;
	kind: string;
}

export const defaultMetrics: () => MetricSpecV2[] = () => [
	{
		type: 'Resource',
		resource: {
			name: 'cpu',
			target: {
				type: 'Utilization',
				averageUtilization: 80
			}
		}
	}
];

export const defaultBehaviour: () => HorizontalPodAutoscalerBehaviorV2 = () => ({
	scaleUp: {
		stabilizationWindowSeconds: 120,
		selectPolicy: 'Max',
		policies: [
			{
				type: 'pods',
				periodSeconds: 20,
				value: 4
			}
		]
	},
	scaleDown: {
		stabilizationWindowSeconds: 120,
		selectPolicy: 'Max',
		policies: [
			{
				type: 'pods',
				periodSeconds: 40,
				value: 4
			}
		]
	}
});

export const createHpa = (chart: Chart, options: HpaOptions): KubeHorizontalPodAutoscalerV2[] => {
	const { maxReplicas, minReplicas, apiVersion, kind, serviceNames } = options;

	return serviceNames.map(serviceName => {
		return new KubeHorizontalPodAutoscalerV2(chart, serviceName + 'hpa', {
			metadata: {
				name: serviceName
			},
			spec: {
				scaleTargetRef: {
					apiVersion: apiVersion ?? 'apps/v1',
					kind: kind ?? 'Deployment',
					name: serviceName
				},
				minReplicas: minReplicas ?? 3,
				maxReplicas: maxReplicas ?? 10,
				metrics: defaultMetrics(),
				behavior: defaultBehaviour()
			}
		});
	});
};
