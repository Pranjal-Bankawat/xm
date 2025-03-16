"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntOrString = exports.Quantity = exports.createServiceManifest = void 0;
const cdk8s_1 = require("cdk8s");
const service_1 = require("./service");
const createServiceManifest = (appName, serviceOptions) => {
    const app = new cdk8s_1.App();
    initializeBaseChart(app, appName, serviceOptions);
    return app.synthYaml();
};
exports.createServiceManifest = createServiceManifest;
var k8s_1 = require("./imports/k8s");
Object.defineProperty(exports, "Quantity", { enumerable: true, get: function () { return k8s_1.Quantity; } });
Object.defineProperty(exports, "IntOrString", { enumerable: true, get: function () { return k8s_1.IntOrString; } });
const initializeBaseChart = (app, appName, serviceOptions) => {
    const { image, ports, namespace } = serviceOptions;
    return new service_1.BaseServiceChart(app, appName, {
        appName,
        namespace,
        deploymentOptions: {
            containerOptions: [
                {
                    image,
                    name: appName,
                    ports: ports.map(port => ({ containerPort: port }))
                }
            ]
        }
        // TODO: K8sServiceOptions
        // TODO: HPAOptions
        // TODO: AmbassadorMappingOptions
    });
};
//# sourceMappingURL=main.js.map