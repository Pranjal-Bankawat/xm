import { Container, EnvFromSource, EnvVar, ResourceRequirements, Probe } from '../../imports/k8s';
export interface ContainerOptions {
    image: string;
    ports: {
        name: string;
        containerPort: number;
    }[];
    env?: EnvVar[];
    envFrom?: EnvFromSource[];
    resources?: ResourceRequirements;
    livenessProbe?: Probe;
    readinessProbe?: Probe;
    startupProbe?: Probe;
}
export declare const createServiceContainer: (serviceName: any, ContainerOptions: any) => Container;
