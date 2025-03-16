"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReadElsaInfixMapping = exports.generateSpec = void 0;
const cdk8s_1 = require("cdk8s");
function generateSpec() {
    return {
        method: "(GET|OPTIONS)",
        method_regex: true,
        prefix: "/elsa/",
        service: "elsa-web-read-svc:8080",
        tls: "istio-upstream",
        timeout_ms: 30000,
        add_response_headers: {
            "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
            "Content-Security-Policy": "default-src 'self' *.cxm-salescloud.com; style-src 'self' 'unsafe-inline' *.cxm-salescloud.com; img-src 'self' *.cxm-salescloud.com"
        },
        cors: {
            origins: "*",
            methods: "GET, OPTIONS",
            headers: "Authorization, Content-Type, x-sap-crm-token",
            max_age: "3600"
        }
    };
}
exports.generateSpec = generateSpec;
function createReadElsaInfixMapping(scope) {
    return new cdk8s_1.ApiObject(scope, "elsa-web-read-mapping", {
        apiVersion: "getambassador.io/v2",
        kind: "Mapping",
        metadata: {
            name: "elsa-web-read-mapping"
        },
        spec: generateSpec()
    });
}
exports.createReadElsaInfixMapping = createReadElsaInfixMapping;
;
//# sourceMappingURL=read-elsa-infix.js.map