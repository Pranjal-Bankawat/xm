import { Chart } from 'cdk8s';
import { KubeService } from '../../imports/k8s';
export interface K8sServiceOptions {
    serviceNames: string[];
    ports: port[];
}
export interface port {
    name: string;
    containerPort: number;
}
export declare const isHttpService: (serviceName: string) => boolean;
export declare const createService: (chart: Chart, options: K8sServiceOptions) => KubeService[];
