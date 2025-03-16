import { App, Chart } from 'cdk8s';

export class DummyChart extends Chart {}

describe('deployment/deployment', () => {
	let args;
	let dummyChart;
	let Deployment, KubeDeployment, createServiceContainerMock;

	function defaultPodAntiAffinity(serviceName) {
		return {
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
		};
	}

	function createServiceContainer(serviceName, containerOptions) {
		return containerOptions.map(containerOption => {
			return {
				image: containerOption.image,
				name: serviceName,
				ports: containerOption.ports.map(({ containerPort }) => ({ containerPort })),
				imagePullPolicy: 'Always'
			};
		});
	}

	function defaultTopologySpreadConstraints(serviceName) {
		return {
			maxSkew: 1,
			topologyKey: 'topology.kubernetes.io/zone',
			whenUnsatisfiable: 'ScheduleAnyway',
			labelSelector: {
				matchLabels: { app: serviceName }
			}
		};
	}

	beforeAll(async () => {
		KubeDeployment = jest.fn();
		createServiceContainerMock = jest.fn(serviceName => ({
			image: 'my-service-image-tag',
			imagePullPolicy: 'Always',
			name: serviceName,
			ports: [
				{
					containerPort: 8080
				}
			]
		}));

		jest.doMock('../../../src/imports/k8s', () => {
			return {
				KubeDeployment
			};
		});
		jest.doMock('../../../src/resources/deployment/serviceContainer', () => {
			return {
				createServiceContainer: createServiceContainerMock
			};
		});
		const { createDeployment } = await import('../../../src/resources/deployment/deployment');
		Deployment = createDeployment;
	});
	beforeEach(() => {
		KubeDeployment.mockClear();
		dummyChart = new DummyChart(new App(), 'my-app', { disableResourceNameHashes: true });
		args = { chart: dummyChart, appName: 'my-app' };

		args.options = {
			serviceNames: ['elsa-grpc', 'elsa-web'],
			containerOptions: [{ image: 'my-service-image-tag', name: 'my-service', ports: [{ containerPort: 8080 }] }]
		};
	});

	it('shall create deployment without additional parameters', () => {
		Deployment(args.chart, args.options);
		expect(KubeDeployment.mock.calls.length).toEqual(2);
		expect(KubeDeployment).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[0] + 'deployment', {
			metadata: {
				name: args.options.serviceNames[0]
			},
			spec: {
				replicas: 2,
				selector: { matchLabels: { app: args.options.serviceNames[0] } },
				template: {
					metadata: {
						annotations: { 'proxy.istio.io/config': 'terminationDrainDuration: 20s' },
						labels: {
							app: args.options.serviceNames[0],
							logformat: 'json'
						}
					},
					spec: {
						affinity: { podAntiAffinity: defaultPodAntiAffinity(args.options.serviceNames[0]) },
						topologySpreadConstraints: [defaultTopologySpreadConstraints(args.options.serviceNames[0])],
						serviceAccountName: 'elsa-master-data-svc',
						containers: createServiceContainer(args.options.serviceNames[0], args.options.containerOptions),
						imagePullSecrets: [{ name: 'cxm-repo-reader' }, { name: 'sap-c4c-artifactory' }]
					}
				}
			}
		});

		expect(KubeDeployment).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[1] + 'deployment', {
			metadata: {
				name: args.options.serviceNames[1]
			},
			spec: {
				replicas: 2,
				selector: { matchLabels: { app: args.options.serviceNames[1] } },
				template: {
					metadata: {
						annotations: { 'proxy.istio.io/config': 'terminationDrainDuration: 20s' },
						labels: {
							app: args.options.serviceNames[1],
							logformat: 'json'
						}
					},
					spec: {
						affinity: { podAntiAffinity: defaultPodAntiAffinity(args.options.serviceNames[1]) },
						topologySpreadConstraints: [defaultTopologySpreadConstraints(args.options.serviceNames[1])],
						serviceAccountName: 'elsa-master-data-svc',
						containers: createServiceContainer(args.options.serviceNames[1], args.options.containerOptions),
						imagePullSecrets: [{ name: 'cxm-repo-reader' }, { name: 'sap-c4c-artifactory' }]
					}
				}
			}
		});
	});

	it('shall create deployment with additional parameters', () => {
		args.options.replicas = 4;
		args.options.serviceAccountName = 'service-name';
		Deployment(args.chart, args.options);
		expect(KubeDeployment.mock.calls.length).toEqual(2);
		expect(KubeDeployment).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[0] + 'deployment', {
			metadata: {
				name: args.options.serviceNames[0]
			},
			spec: {
				replicas: 4,
				selector: { matchLabels: { app: args.options.serviceNames[0] } },
				template: {
					metadata: {
						annotations: { 'proxy.istio.io/config': 'terminationDrainDuration: 20s' },
						labels: {
							app: args.options.serviceNames[0],
							logformat: 'json'
						}
					},
					spec: {
						affinity: { podAntiAffinity: defaultPodAntiAffinity(args.options.serviceNames[0]) },
						topologySpreadConstraints: [defaultTopologySpreadConstraints(args.options.serviceNames[0])],
						serviceAccountName: 'service-name',
						containers: createServiceContainer(args.options.serviceNames[0], args.options.containerOptions),
						imagePullSecrets: [{ name: 'cxm-repo-reader' }, { name: 'sap-c4c-artifactory' }]
					}
				}
			}
		});

		expect(KubeDeployment).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[1] + 'deployment', {
			metadata: {
				name: args.options.serviceNames[1]
			},
			spec: {
				replicas: 4,
				selector: { matchLabels: { app: args.options.serviceNames[1] } },
				template: {
					metadata: {
						annotations: { 'proxy.istio.io/config': 'terminationDrainDuration: 20s' },
						labels: {
							app: args.options.serviceNames[1],
							logformat: 'json'
						}
					},
					spec: {
						affinity: { podAntiAffinity: defaultPodAntiAffinity(args.options.serviceNames[1]) },
						topologySpreadConstraints: [defaultTopologySpreadConstraints(args.options.serviceNames[1])],
						serviceAccountName: 'service-name',
						containers: createServiceContainer(args.options.serviceNames[1], args.options.containerOptions),
						imagePullSecrets: [{ name: 'cxm-repo-reader' }, { name: 'sap-c4c-artifactory' }]
					}
				}
			}
		});
	});
});
