import { Container, ContainerPort, EnvFromSource, EnvVar, ResourceRequirements, Quantity, Probe, IntOrString } from '../../imports/k8s';

export interface ContainerOptions {
	image: string;
	ports: { name: string; containerPort: number }[];
	env?: EnvVar[];
	envFrom?: EnvFromSource[];
	resources?: ResourceRequirements;
	livenessProbe?: Probe;
	readinessProbe?: Probe;
	startupProbe?: Probe;
}

const defaultResources: ResourceRequirements = {
	limits: {
		memory: Quantity.fromString('2Gi'),
		cpu: Quantity.fromString('1100m')
	},
	requests: {
		memory: Quantity.fromString('450Mi'),
		cpu: Quantity.fromString('50m')
	}
};

const defaultLivenessProbe: Probe = {
	httpGet: { path: '/livez', port: IntOrString.fromNumber(8080), scheme: 'HTTP' },
	periodSeconds: 5,
	timeoutSeconds: 1,
	successThreshold: 1,
	failureThreshold: 5
};

const defaultReadinessProbe: Probe = {
	httpGet: { path: '/readyz', port: IntOrString.fromNumber(8080), scheme: 'HTTP' },
	periodSeconds: 2,
	failureThreshold: 10
};

const defaultStartupProbe: Probe = {
	httpGet: { path: '/startupz', port: IntOrString.fromNumber(8080), scheme: 'HTTP' },
	timeoutSeconds: 1,
	periodSeconds: 2,
	successThreshold: 1,
	failureThreshold: 10
};

const createDefaultEnv = (env: EnvVar[], name: string): EnvVar[] => {
	const defaultEnvs: EnvVar[] = [
		{ name: 'K8S_POD_IP', valueFrom: { fieldRef: { fieldPath: 'status.podIP' } } },
		{ name: 'ELASTIC_APM_SERVICE_NODE', value: name },
		{ name: 'ELASTIC_APM_SERVICE_NAME', value: `${name}-svc` }
	];
	return env ? [...defaultEnvs, ...env] : defaultEnvs;
};

const createDefaultEnvFrom = (envFrom: EnvFromSource[]): EnvFromSource[] => {
	const defaultEnvs: EnvFromSource[] = [
		{ secretRef: { name: 'elastic-apm-secrets', optional: true } },
		{ configMapRef: { name: 'elsa-config' } },
		{ configMapRef: { name: 'elsa-db-config' } },
		{ configMapRef: { name: 'elsa-web-config' } }
	];
	return envFrom ? [...defaultEnvs, ...envFrom] : defaultEnvs;
};

export const createServiceContainer: (serviceName, ContainerOptions) => Container = (serviceName: string, containerOptions: ContainerOptions) => {
	const { image, ports, env, envFrom, resources, livenessProbe, readinessProbe, startupProbe } = containerOptions;
	let updatedPorts: ContainerPort[];

	if (!serviceName.endsWith('grpc')) {
		updatedPorts = [];
		ports.forEach(({ containerPort, name }) => {
			if (name != 'grpc') {
				updatedPorts.push({ containerPort });
			}
		});
	}

	return {
		image,
		name: serviceName,
		ports: updatedPorts ?? ports.map(({ containerPort }) => ({ containerPort })),
		imagePullPolicy: 'Always',
		env: createDefaultEnv(env, serviceName),
		envFrom: createDefaultEnvFrom(envFrom),
		resources: resources ?? defaultResources,
		readinessProbe: readinessProbe ?? defaultReadinessProbe,
		livenessProbe: livenessProbe ?? defaultLivenessProbe,
		startupProbe: startupProbe ?? defaultStartupProbe
	};
};
