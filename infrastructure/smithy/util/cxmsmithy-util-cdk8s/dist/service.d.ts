import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { DeploymentOptions } from './deployment/deployment';
export interface ServiceOptions {
    appName: string;
    namespace?: string;
    deploymentOptions: DeploymentOptions;
}
export declare class BaseServiceChart extends Chart {
    constructor(scope: Construct, filename: string, serviceOptions: ServiceOptions);
}
declare const _default: {
    BaseServiceChart: typeof BaseServiceChart;
};
export default _default;
