"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWriteElsaInfixMapping = exports.generateSpec = void 0;
const cdk8s_1 = require("cdk8s");
function generateSpec() {
    return {
        method: "(POST|PUT|PATCH|DELETE)",
        method_regex: true,
        prefix: "/elsa/",
        service: "elsa-web-write-svc:8080",
        tls: "istio-upstream",
        timeout_ms: 30000,
        add_response_headers: {
            "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
            "Content-Security-Policy": "default-src 'self' *.cxm-salescloud.com; style-src 'self' 'unsafe-inline' *.cxm-salescloud.com; img-src 'self' *.cxm-salescloud.com"
        },
        cors: {
            origins: "*",
            methods: "POST, OPTIONS, PUT, PATCH",
            headers: "Authorization, Content-Type, x-sap-crm-token",
            max_age: "3600"
        }
    };
}
exports.generateSpec = generateSpec;
function createWriteElsaInfixMapping(scope) {
    return new cdk8s_1.ApiObject(scope, "elsa-web-write-mapping", {
        apiVersion: "getambassador.io/v2",
        kind: "Mapping",
        metadata: {
            name: "elsa-web-write-mapping"
        },
        spec: generateSpec()
    });
}
exports.createWriteElsaInfixMapping = createWriteElsaInfixMapping;
;
//# sourceMappingURL=write-elsa-infix.js.map