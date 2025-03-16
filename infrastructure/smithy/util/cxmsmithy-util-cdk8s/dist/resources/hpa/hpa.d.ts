import { KubeHorizontalPodAutoscalerV2, MetricSpecV2 } from "../../imports/k8s";
import { Chart } from 'cdk8s';
import { HorizontalPodAutoscalerBehaviorV2 } from '../../imports/k8s';
export interface HpaOptions {
    serviceNames: string[];
    apiVersion?: string;
    maxReplicas: number;
    minReplicas?: number;
    kind: string;
}
export declare const defaultMetrics: () => MetricSpecV2[];
export declare const defaultBehaviour: () => HorizontalPodAutoscalerBehaviorV2;
export declare const createHpa: (chart: Chart, options: HpaOptions) => KubeHorizontalPodAutoscalerV2[];
