export interface ServiceOptions {
    image: string;
    ports: number[];
    namespace?: string;
}
export declare const createServiceManifest: (appName: string, serviceOptions: ServiceOptions) => string;
export { Quantity, IntOrString } from './imports/k8s';
