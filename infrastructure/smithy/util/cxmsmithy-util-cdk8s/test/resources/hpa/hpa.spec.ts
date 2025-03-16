import { App, Chart } from 'cdk8s';

export class DummyChart extends Chart {}

describe('deployment/deployment', () => {
	let args;
	let dummyChart;
	let Hpa, KubeAutoScaler;

	function defaultMetrics() {
		return [
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
	}

	function defaultBehaviour() {
		return {
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
		};
	}

	beforeAll(async () => {
		KubeAutoScaler = jest.fn();
		jest.doMock('../../../src/imports/k8s', () => {
			return {
				KubeHorizontalPodAutoscalerV2: KubeAutoScaler
			};
		});
		const { createHpa } = await import('../../../src/resources/hpa/hpa');
		Hpa = createHpa;
	});
	beforeEach(() => {
		KubeAutoScaler.mockClear();
		dummyChart = new DummyChart(new App(), 'my-app', { disableResourceNameHashes: true });
		args = { chart: dummyChart, appName: 'my-app' };

		args.options = {
			serviceNames: ['elsa-grpc', 'elsa-web']
		};
	});

	it('shall create hpa with defaults', () => {
		Hpa(args.chart, args.options);
		expect(KubeAutoScaler.mock.calls.length).toEqual(2);
		expect(KubeAutoScaler).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[0] + 'hpa', {
			metadata: {
				name: args.options.serviceNames[0]
			},
			spec: {
				scaleTargetRef: {
					apiVersion: 'apps/v1',
					kind: 'Deployment',
					name: args.options.serviceNames[0]
				},
				minReplicas: 3,
				maxReplicas: 10,
				metrics: defaultMetrics(),
				behavior: defaultBehaviour()
			}
		});

		expect(KubeAutoScaler).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[1] + 'hpa', {
			metadata: {
				name: args.options.serviceNames[1]
			},
			spec: {
				scaleTargetRef: {
					apiVersion: 'apps/v1',
					kind: 'Deployment',
					name: args.options.serviceNames[1]
				},
				minReplicas: 3,
				maxReplicas: 10,
				metrics: defaultMetrics(),
				behavior: defaultBehaviour()
			}
		});
	});

	it('shall create hpa with parameters', () => {
		args.options = {
			...args.options,
			maxReplicas: 11,
			minReplicas: 7,
			apiVersion: 'v2',
			kind: 'kind'
		};
		Hpa(args.chart, args.options);
		expect(KubeAutoScaler.mock.calls.length).toEqual(2);
		expect(KubeAutoScaler).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[0] + 'hpa', {
			metadata: {
				name: args.options.serviceNames[0]
			},
			spec: {
				scaleTargetRef: {
					apiVersion: 'v2',
					kind: 'kind',
					name: args.options.serviceNames[0]
				},
				minReplicas: 7,
				maxReplicas: 11,
				metrics: defaultMetrics(),
				behavior: defaultBehaviour()
			}
		});

		expect(KubeAutoScaler).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[1] + 'hpa', {
			metadata: {
				name: args.options.serviceNames[1]
			},
			spec: {
				scaleTargetRef: {
					apiVersion: 'v2',
					kind: 'kind',
					name: args.options.serviceNames[1]
				},
				minReplicas: 7,
				maxReplicas: 11,
				metrics: defaultMetrics(),
				behavior: defaultBehaviour()
			}
		});
	});
});
