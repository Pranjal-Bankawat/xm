import { Construct } from 'constructs';
import { ApiObject } from 'cdk8s';

interface Mappings {
	[key: string]: string;
}

const mappingServices: Mappings[] = [
	{
		name: 'elsa-service-read-mapping1',
		prefix: '/sap/c4c/api/v1/(account|address|business-partner|business-partner-relationship|contact-person|customer|employee|individual-customer|competitor)-service/.*'
	},
	{
		name: 'elsa-service-read-mapping2',
		prefix: '/sap/c4c/api/v1/(organizational-unit|partner|product|product-group|sales-territory|supplier|supplier-contact|account-hierarchy|key-account-plan)-service/.*'
	},
	{
		name: 'elsa-service-read-mapping3',
		prefix: '/sap/c4c/api/v1/(business-partner-for-replication|business-partner-relationship-for-replication)-service/.*'
	}
];

function generateSpec(prefix: string) {
	return {
		method: '(GET|OPTIONS)',
		method_regex: true,
		prefix,
		prefix_regex: true,
		rewrite: '',
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
export function createReadMapping(scope: Construct): ApiObject[] {
	return mappingServices.map(({ name, prefix }) => {
		return new ApiObject(scope, name, {
			apiVersion: 'getambassador.io/v2',
			kind: 'Mapping',
			metadata: {
				name
			},
			spec: generateSpec(prefix)
		});
	});
}
