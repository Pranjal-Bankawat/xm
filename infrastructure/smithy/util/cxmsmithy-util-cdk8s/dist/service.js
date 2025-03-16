"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseServiceChart = void 0;
const cdk8s_1 = require("cdk8s");
const deployment_1 = require("./deployment/deployment");
class BaseServiceChart extends cdk8s_1.Chart {
    constructor(scope, filename, serviceOptions) {
        const { appName, deploymentOptions, namespace } = serviceOptions;
        super(scope, filename, { disableResourceNameHashes: true, namespace });
        (0, deployment_1.createDeployment)(this, appName, deploymentOptions);
        // TODO: Create K8sService
        // TODO: Create HPAOptions
        // TODO: Create AmbassadorMappingOptions
    }
}
exports.BaseServiceChart = BaseServiceChart;
exports.default = { BaseServiceChart };
//# sourceMappingURL=service.js.map
