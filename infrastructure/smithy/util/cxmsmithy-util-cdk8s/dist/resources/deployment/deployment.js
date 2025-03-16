"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeployment = exports.defaultTopologySpreadConstraints = exports.defaultPodAntiAffinity = void 0;
const k8s_1 = require("../../imports/k8s");
const serviceContainer_1 = require("./serviceContainer");
const defaultLabels = (serviceName) => ({
    app: serviceName,
    logformat: 'json'
});
const defaultAnnotations = () => ({
    'proxy.istio.io/config': 'terminationDrainDuration: 20s'
});
const defaultPodAntiAffinity = (serviceName) => ({
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
exports.defaultPodAntiAffinity = defaultPodAntiAffinity;
const defaultTopologySpreadConstraints = (serviceName) => ({
    maxSkew: 1,
    topologyKey: 'topology.kubernetes.io/zone',
    whenUnsatisfiable: 'ScheduleAnyway',
    labelSelector: {
        matchLabels: { app: serviceName }
    }
});
exports.defaultTopologySpreadConstraints = defaultTopologySpreadConstraints;
const createDeployment = (chart, options) => {
    const { containerOptions, replicas, serviceAccountName, serviceNames } = options;
    return serviceNames.map(serviceName => {
        return new k8s_1.KubeDeployment(chart, serviceName + 'deployment', {
            metadata: {
                name: serviceName
            },
            spec: {
                replicas: replicas ?? 2,
                selector: { matchLabels: { app: serviceName } },
                template: {
                    metadata: { annotations: defaultAnnotations(), labels: defaultLabels(serviceName) },
                    spec: {
                        affinity: { podAntiAffinity: (0, exports.defaultPodAntiAffinity)(serviceName) },
                        topologySpreadConstraints: [(0, exports.defaultTopologySpreadConstraints)(serviceName)],
                        serviceAccountName: serviceAccountName ?? 'elsa-master-data-svc',
                        containers: containerOptions.map(containerOption => (0, serviceContainer_1.createServiceContainer)(serviceName, containerOption)),
                        imagePullSecrets: [{ name: 'cxm-repo-reader' }, { name: 'sap-c4c-artifactory' }]
                    }
                }
            }
        });
    });
};
exports.createDeployment = createDeployment;
//# sourceMappingURL=deployment.js.map