import { Construct } from 'constructs';
import { ApiObject } from 'cdk8s';
interface Mappings {
    [key: string]: string | boolean | Mappings | number;
}
export declare function generateSpec(): Mappings;
export declare function createWriteElsaInfixMapping(scope: Construct): ApiObject;
export {};
