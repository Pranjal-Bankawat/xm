import { Construct } from 'constructs';
import { ApiObject } from 'cdk8s';
export declare function generateSpec(): {
    method: string;
    method_regex: boolean;
    prefix: string;
    service: string;
    tls: string;
    timeout_ms: number;
    add_response_headers: {
        "Strict-Transport-Security": string;
        "Content-Security-Policy": string;
    };
    cors: {
        origins: string;
        methods: string;
        headers: string;
        max_age: string;
    };
};
export declare function createReadElsaInfixMapping(scope: Construct): ApiObject;
