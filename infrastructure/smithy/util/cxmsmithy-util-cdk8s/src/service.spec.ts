import { BaseServiceChart } from './service';

import { createDeployment } from './resources/deployment/deployment';
import { App } from 'cdk8s';
jest.mock('./resources/deployment/deployment.ts', () => {
	return {
		createDeployment: jest.fn()
	};
});

describe('service', () => {
	let createDeploymentMock;
	let args;

	beforeAll(() => {
		createDeploymentMock = createDeployment as jest.Mocked<typeof createDeployment>;
	});

	beforeEach(() => {
		createDeploymentMock.mockClear();
		createDeploymentMock.mockReturnValue({});
		args = {
			scope: new App(),
			filename: 'manifest.yaml',
			serviceOptions: {
				appName: 'my-app'
			}
		};
	});

	it('shall create service chart using parameters', () => {
		const serviceChart = new BaseServiceChart(args.scope, args.filename, args.serviceOptions);

		expect(createDeploymentMock).toHaveBeenCalledWith(serviceChart, args.serviceOptions.deploymentOptions);
	});
});
