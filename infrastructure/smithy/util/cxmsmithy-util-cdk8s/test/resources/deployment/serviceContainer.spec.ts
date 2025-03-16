import { createServiceContainer } from '../../../src/resources/deployment/serviceContainer';
import { Quantity, IntOrString } from '../../../src/imports/k8s';

describe('deployment/serviceContainer', () => {
	let args;
	let serviceName;

	beforeEach(() => {
		serviceName = 'service-name';
		args = {
			image: 'service-image-tag',
			name: serviceName,
			ports: [
				{ containerPort: 8080, name: 'http' },
				{ containerPort: 50051, name: 'grpc' }
			]
		};
	});

	it('shall create service container using parameters', () => {
		const serviceContainer = createServiceContainer(serviceName, args);

		expect(serviceContainer.image).toEqual('service-image-tag');
		expect(serviceContainer.name).toEqual(serviceName);
		expect(serviceContainer.ports).toEqual([{ containerPort: 8080 }]);
		expect(serviceContainer.imagePullPolicy).toEqual('Always');
		expect(serviceContainer.env).toEqual([
			{
				name: 'K8S_POD_IP',
				valueFrom: { fieldRef: { fieldPath: 'status.podIP' } }
			},
			{
				name: 'ELASTIC_APM_SERVICE_NODE',
				value: serviceName
			},
			{
				name: 'ELASTIC_APM_SERVICE_NAME',
				value: 'service-name-svc'
			}
		]);
		expect(serviceContainer.envFrom).toEqual([
			{ secretRef: { name: 'elastic-apm-secrets', optional: true } },
			{
				configMapRef: { name: 'elsa-config' }
			},
			{ configMapRef: { name: 'elsa-db-config' } },
			{ configMapRef: { name: 'elsa-web-config' } }
		]);
		expect(serviceContainer.resources).toEqual({
			limits: {
				memory: Quantity.fromString('2Gi'),
				cpu: Quantity.fromString('1100m')
			},
			requests: {
				memory: Quantity.fromString('450Mi'),
				cpu: Quantity.fromString('50m')
			}
		});
		expect(serviceContainer.readinessProbe).toEqual({
			httpGet: { path: '/readyz', port: IntOrString.fromNumber(8080), scheme: 'HTTP' },
			periodSeconds: 2,
			failureThreshold: 10
		});
		expect(serviceContainer.livenessProbe).toEqual({
			httpGet: { path: '/livez', port: IntOrString.fromNumber(8080), scheme: 'HTTP' },
			periodSeconds: 5,
			timeoutSeconds: 1,
			successThreshold: 1,
			failureThreshold: 5
		});
		expect(serviceContainer.startupProbe).toEqual({
			httpGet: { path: '/startupz', port: IntOrString.fromNumber(8080), scheme: 'HTTP' },
			timeoutSeconds: 1,
			periodSeconds: 2,
			successThreshold: 1,
			failureThreshold: 10
		});
	});

	it('shall include grpc port', () => {
		const serviceContainer = createServiceContainer('elsa-grpc', args);
		expect(serviceContainer.ports).toEqual([{ containerPort: 8080 }, { containerPort: 50051 }]);
	});

	it('shall use additional envs', () => {
		args.env = [{ name: 'POD_ENV', value: 'mypodenv' }];
		const serviceContainer = createServiceContainer(serviceName, args);

		expect(serviceContainer.env).toEqual([
			{
				name: 'K8S_POD_IP',
				valueFrom: { fieldRef: { fieldPath: 'status.podIP' } }
			},
			{
				name: 'ELASTIC_APM_SERVICE_NODE',
				value: serviceName
			},
			{
				name: 'ELASTIC_APM_SERVICE_NAME',
				value: 'service-name-svc'
			},
			{
				name: 'POD_ENV',
				value: 'mypodenv'
			}
		]);
	});

	it('shall use additional env references', () => {
		args.envFrom = [{ configMapRef: { name: 'myconfigmap' } }];
		const serviceContainer = createServiceContainer(serviceName, args);

		expect(serviceContainer.envFrom).toEqual([
			{ secretRef: { name: 'elastic-apm-secrets', optional: true } },
			{
				configMapRef: { name: 'elsa-config' }
			},
			{ configMapRef: { name: 'elsa-db-config' } },
			{ configMapRef: { name: 'elsa-web-config' } },
			{
				configMapRef: { name: 'myconfigmap' }
			}
		]);
	});

	it('shall use resource request ', () => {
		args.resources = {
			limits: {
				memory: Quantity.fromString('1024Gi')
			},
			requests: {
				memory: Quantity.fromString('512Gi'),
				cpu: Quantity.fromString('5000m')
			}
		};

		const serviceContainer = createServiceContainer(serviceName, args);

		expect(serviceContainer.resources).toEqual(args.resources);
	});

	it('shall use custom readiness probe', () => {
		args.readinessProbe = {
			httpGet: { path: '/customreadiness', port: IntOrString.fromNumber(9090), scheme: 'HTTP' },
			periodSeconds: 20,
			failureThreshold: 60
		};
		const serviceContainer = createServiceContainer(serviceName, args);

		expect(serviceContainer.readinessProbe).toEqual(args.readinessProbe);
	});

	it('shall use custom liveness probe', () => {
		args.livenessProbe = {
			httpGet: { path: '/customliveness', port: IntOrString.fromNumber(9090), scheme: 'HTTP' },
			periodSeconds: 20,
			failureThreshold: 60
		};
		const serviceContainer = createServiceContainer(serviceName, args);

		expect(serviceContainer.livenessProbe).toEqual(args.livenessProbe);
	});

	it('shall use custom startup probe', () => {
		args.startupProbe = {
			httpGet: { path: '/customstartup', port: IntOrString.fromNumber(9090), scheme: 'HTTP' },
			periodSeconds: 20,
			failureThreshold: 60
		};
		const serviceContainer = createServiceContainer(serviceName, args);

		expect(serviceContainer.startupProbe).toEqual(args.startupProbe);
	});
});
