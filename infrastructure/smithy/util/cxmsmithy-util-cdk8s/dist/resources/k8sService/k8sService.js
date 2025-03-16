"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createService = exports.isHttpService = void 0;
const k8s_1 = require("../../imports/k8s");
const mappedServiceName = {
    "elsa-web-batch": "elsa-web-svc"
};
const isHttpService = (serviceName) => {
    return !serviceName.endsWith('grpc');
};
exports.isHttpService = isHttpService;
const createService = (chart, options) => {
    const { serviceNames, ports } = options;
    return serviceNames.map(serviceName => {
        return new k8s_1.KubeService(chart, serviceName + "-svc", {
            metadata: {
                name: mappedServiceName[serviceName] ?? serviceName + "-svc"
            },
            spec: {
                ports: [{
                        name: (0, exports.isHttpService)(serviceName) ? ports[0].name : ports[1].name,
                        port: (0, exports.isHttpService)(serviceName) ? ports[0].containerPort : ports[1].containerPort,
                        targetPort: k8s_1.IntOrString.fromNumber(((0, exports.isHttpService)(serviceName) ? ports[0].containerPort : ports[1].containerPort))
                    }],
                selector: {
                    app: serviceName
                },
                type: "ClusterIP"
            }
        });
    });
};
exports.createService = createService;
//# sourceMappingURL=k8sService.js.map