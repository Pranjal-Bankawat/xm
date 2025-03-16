import { Construct } from 'constructs';
import { ApiObject } from 'cdk8s';

export function generateSpec() {
	return {
		method: '(GET|OPTIONS)',
		method_regex: true,
		prefix: '/elsa/',
		service: 'elsa-web-read-svc:8080',
		tls: 'istio-upstream',
		timeout_ms: 30000,
		add_response_headers: {
			'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
			'Content-Security-Policy': "default-src 'self' *.cxm-salescloud.com; style-src 'self' 'unsafe-inline' *.cxm-salescloud.com; img-src 'self' *.cxm-salescloud.com"
		},
		cors: {
			origins: '*',
			methods: 'GET, OPTIONS',
			headers: 'Authorization, Content-Type, x-sap-crm-token',
			max_age: '3600'
		}
	};
}

export function createReadElsaInfixMapping(scope: Construct): ApiObject {
	return new ApiObject(scope, 'elsa-web-read-mapping', {
		apiVersion: 'getambassador.io/v2',
		kind: 'Mapping',
		metadata: {
			name: 'elsa-web-read-mapping'
		},
		spec: generateSpec()
	});
}
