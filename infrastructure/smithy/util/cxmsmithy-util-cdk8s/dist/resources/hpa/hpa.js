"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHpa = exports.defaultBehaviour = exports.defaultMetrics = void 0;
const k8s_1 = require("../../imports/k8s");
const defaultMetrics = () => ([
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
]);
exports.defaultMetrics = defaultMetrics;
const defaultBehaviour = () => ({
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
exports.defaultBehaviour = defaultBehaviour;
const createHpa = (chart, options) => {
    const { maxReplicas, minReplicas, apiVersion, kind, serviceNames } = options;
    return serviceNames.map(serviceName => {
        return new k8s_1.KubeHorizontalPodAutoscalerV2(chart, serviceName + "hpa", {
            metadata: {
                name: serviceName
            },
            spec: {
                scaleTargetRef: {
                    apiVersion: apiVersion ?? "apps/v1",
                    kind: kind ?? "Deployment",
                    name: serviceName
                },
                minReplicas: minReplicas ?? 3,
                maxReplicas: maxReplicas ?? 10,
                metrics: (0, exports.defaultMetrics)(),
                behavior: (0, exports.defaultBehaviour)()
            }
        });
    });
};
exports.createHpa = createHpa;
//# sourceMappingURL=hpa.js.map