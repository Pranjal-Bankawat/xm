import { Chart } from 'cdk8s';
import { KubeDeployment, PodAntiAffinity, TopologySpreadConstraint } from '../../imports/k8s';
import { ContainerOptions } from './serviceContainer';
export interface DeploymentOptions {
    containerOptions: ContainerOptions[];
    replicas?: number;
    serviceAccountName?: string;
    serviceNames: string[];
}
export declare const defaultPodAntiAffinity: (serviceName: string) => PodAntiAffinity;
export declare const defaultTopologySpreadConstraints: (serviceName: string) => TopologySpreadConstraint;
export declare const createDeployment: (chart: Chart, options: DeploymentOptions) => KubeDeployment[];
