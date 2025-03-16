import { App } from 'cdk8s';
jest.mock('cdk8s', () => {
	return {
		KubeMutatingWebhookConfiguration: jest.fn().mockImplementation(() => {
			return {};
		}),
		ApiObject: jest.fn().mockImplementation(() => {
			return {};
		}),
		App: jest.fn().mockImplementation(() => {
			return {};
		})
	};
});
import { BaseServiceChart } from './service';
jest.mock('./service', () => {
	return {
		BaseServiceChart: jest.fn().mockImplementation(() => {
			return {};
		})
	};
});

describe('main', () => {
	let createServiceManifest, Quantity, IntOrString;
	let baseServiceChartClassMock, appClassMock;
	let appMock;
	let args;

	beforeAll(async () => {
		const mainImport = await import('./main');
		createServiceManifest = mainImport.createServiceManifest;
		Quantity = mainImport.Quantity;
		IntOrString = mainImport.IntOrString;
		baseServiceChartClassMock = BaseServiceChart as jest.Mocked<typeof BaseServiceChart>;
		appClassMock = App as jest.Mocked<typeof App>;
		appMock = { synthYaml: jest.fn() } as unknown as App;
	});

	beforeEach(() => {
		baseServiceChartClassMock.mockClear();
		appClassMock.mockClear();

		baseServiceChartClassMock.mockReturnValue({});
		appClassMock.mockReturnValue(appMock);

		args = {
			appName: 'my-app',
			serviceOptions: {
				image: 'my-service-image-tag',
				ports: [8080]
			}
		};
	});

	it('shall export Quantity from import/k8s', async () => {
		expect(Quantity).toBeDefined();
		expect(Quantity).toEqual((await import('./imports/k8s')).Quantity);
	});

	it('shall export IntOrString from import/k8s', async () => {
		expect(IntOrString).toBeDefined();
		expect(IntOrString).toEqual((await import('./imports/k8s')).IntOrString);
	});

	it('shall create service manifest using parameters', () => {
		createServiceManifest(args.appName, args.serviceOptions);

		expect(appClassMock).toHaveBeenCalled();
		expect(baseServiceChartClassMock).toHaveBeenCalledWith(appMock, args.appName, {
			appName: args.appName,
			deploymentOptions: {
				containerOptions: [
					{
						image: args.serviceOptions.image,
						name: args.appName,
						ports: [{ containerPort: args.serviceOptions.ports[0] }]
					}
				]
			}
		});
		expect(appMock.synthYaml).toHaveBeenCalled();
	});

	it('shall consider namespace when provided', () => {
		args.serviceOptions.namespace = 'my-namespace';

		createServiceManifest(args.appName, args.serviceOptions);

		expect(baseServiceChartClassMock).toHaveBeenCalledWith(appMock, args.appName, {
			appName: args.appName,
			namespace: args.serviceOptions.namespace,
			deploymentOptions: {
				containerOptions: [
					{
						image: args.serviceOptions.image,
						name: args.appName,
						ports: [{ containerPort: args.serviceOptions.ports[0] }]
					}
				]
			}
		});
	});
});
