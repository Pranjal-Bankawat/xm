"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceContainer = void 0;
const k8s_1 = require("../../imports/k8s");
const defaultResources = {
    limits: {
        memory: k8s_1.Quantity.fromString('2Gi'),
        cpu: k8s_1.Quantity.fromString('1100m')
    },
    requests: {
        memory: k8s_1.Quantity.fromString('450Mi'),
        cpu: k8s_1.Quantity.fromString('50m')
    }
};
const defaultLivenessProbe = {
    httpGet: { path: '/livez', port: k8s_1.IntOrString.fromNumber(8080), scheme: 'HTTP' },
    periodSeconds: 5,
    timeoutSeconds: 1,
    successThreshold: 1,
    failureThreshold: 5
};
const defaultReadinessProbe = {
    httpGet: { path: '/readyz', port: k8s_1.IntOrString.fromNumber(8080), scheme: 'HTTP' },
    periodSeconds: 2,
    failureThreshold: 10
};
const defaultStartupProbe = {
    httpGet: { path: '/startupz', port: k8s_1.IntOrString.fromNumber(8080), scheme: 'HTTP' },
    timeoutSeconds: 1,
    periodSeconds: 2,
    successThreshold: 1,
    failureThreshold: 10
};
const createDefaultEnv = (env, name) => {
    const defaultEnvs = [
        { name: 'K8S_POD_IP', valueFrom: { fieldRef: { fieldPath: 'status.podIP' } } },
        { name: 'ELASTIC_APM_SERVICE_NODE', value: name },
        { name: 'ELASTIC_APM_SERVICE_NAME', value: `${name}-svc` }
    ];
    return env ? [...defaultEnvs, ...env] : defaultEnvs;
};
const createDefaultEnvFrom = (envFrom) => {
    const defaultEnvs = [{ secretRef: { name: 'elastic-apm-secrets', optional: true } }, { configMapRef: { name: 'elsa-config' } }, { configMapRef: { name: 'elsa-db-config' } }, { configMapRef: { name: 'elsa-web-config' } }];
    return envFrom ? [...defaultEnvs, ...envFrom] : defaultEnvs;
};
const createServiceContainer = (serviceName, containerOptions) => {
    const { image, ports, env, envFrom, resources, livenessProbe, readinessProbe, startupProbe } = containerOptions;
    let updatedPorts;
    if (!serviceName.endsWith('grpc')) {
        updatedPorts = [];
        ports.forEach(({ containerPort, name }) => {
            if (name != "grpc") {
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
exports.createServiceContainer = createServiceContainer;
//# sourceMappingURL=serviceContainer.js.map