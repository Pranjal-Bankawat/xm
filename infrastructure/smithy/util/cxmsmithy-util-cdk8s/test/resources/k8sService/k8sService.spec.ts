import { App, Chart } from 'cdk8s';

export class DummyChart extends Chart {}

describe('deployment/deployment', () => {
	let args;
	let dummyChart;
	let Service, KubeService;

	beforeAll(async () => {
		KubeService = jest.fn();
		jest.doMock('../../../src/imports/k8s', () => {
			return {
				KubeService: KubeService,
				IntOrString: { fromNumber: jest.fn(number => number) }
			};
		});
		const { createService } = await import('../../../src/resources/k8sService/k8sService');
		Service = createService;
	});
	beforeEach(() => {
		KubeService.mockClear();
		dummyChart = new DummyChart(new App(), 'my-app', { disableResourceNameHashes: true });
		args = { chart: dummyChart, appName: 'my-app' };

		args.options = {
			serviceNames: ['elsa-grpc', 'elsa-web'],
			ports: [
				{ name: 'http', containerPort: 8080 },
				{ name: 'grpc', containerPort: 50051 }
			]
		};
	});

	it('shall create service with defaults', () => {
		Service(args.chart, args.options);
		expect(KubeService.mock.calls.length).toEqual(2);
		expect(KubeService).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[0] + '-svc', {
			metadata: {
				name: args.options.serviceNames[0] + '-svc'
			},
			spec: {
				ports: [
					{
						name: 'grpc',
						port: 50051,
						targetPort: 50051
					}
				],
				selector: {
					app: args.options.serviceNames[0]
				},
				type: 'ClusterIP'
			}
		});

		expect(KubeService).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[1] + '-svc', {
			metadata: {
				name: args.options.serviceNames[1] + '-svc'
			},
			spec: {
				ports: [
					{
						name: 'http',
						port: 8080,
						targetPort: 8080
					}
				],
				selector: {
					app: args.options.serviceNames[1]
				},
				type: 'ClusterIP'
			}
		});
	});

	it('shall create service with service mapping', () => {
		args.options.serviceNames = ['elsa-web-batch'];
		Service(args.chart, args.options);
		expect(KubeService.mock.calls.length).toEqual(1);
		expect(KubeService).toHaveBeenCalledWith(dummyChart, args.options.serviceNames[0] + '-svc', {
			metadata: {
				name: 'elsa-web-svc'
			},
			spec: {
				ports: [
					{
						name: 'http',
						port: 8080,
						targetPort: 8080
					}
				],
				selector: {
					app: args.options.serviceNames[0]
				},
				type: 'ClusterIP'
			}
		});
	});
});
