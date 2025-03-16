export class DummyChart {}

describe('deployment/deployment', () => {
	let args;
	let dummyChart;
	let WriteMapping, ApiObject;

	const mappingServices = [
		{
			name: 'elsa-service-write-mapping1',
			prefix: '/sap/c4c/api/v1/(account|address|business-partner|business-partner-relationship|contact-person|customer|employee|individual-customer|competitor)-service/.*'
		},
		{
			name: 'elsa-service-write-mapping2',
			prefix: '/sap/c4c/api/v1/(organizational-unit|partner|product|product-group|sales-territory|supplier|supplier-contact|account-hierarchy|key-account-plan)-service/.*'
		},
		{
			name: 'elsa-service-write-mapping3',
			prefix: '/sap/c4c/api/v1/(business-partner-for-replication|business-partner-relationship-for-replication)-service/.*'
		}
	];
	function generateSpec(prefix: string) {
		return {
			method: '(POST|PUT|PATCH|DELETE)',
			method_regex: true,
			prefix,
			prefix_regex: true,
			rewrite: '',
			service: 'elsa-web-write-svc:8080',
			tls: 'istio-upstream',
			timeout_ms: 30000,
			add_response_headers: {
				'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
				'Content-Security-Policy': "default-src 'self' *.cxm-salescloud.com; style-src 'self' 'unsafe-inline' *.cxm-salescloud.com; img-src 'self' *.cxm-salescloud.com"
			},
			cors: {
				origins: '*',
				methods: 'POST, OPTIONS, PUT, PATCH',
				headers: 'Authorization, Content-Type, x-sap-crm-token',
				max_age: '3600'
			}
		};
	}

	beforeAll(async () => {
		ApiObject = jest.fn();
		jest.doMock('cdk8s', () => {
			return {
				ApiObject: ApiObject
			};
		});
		const { createWriteMapping } = await import('../../../../../src/resources/components/ambassador/write/write');
		WriteMapping = createWriteMapping;
	});
	beforeEach(() => {
		ApiObject.mockClear();
		dummyChart = new DummyChart();
		args = { chart: dummyChart, appName: 'my-app' };

		args.options = {
			serviceNames: ['elsa-grpc', 'elsa-web']
		};
	});

	it('shall create write mappings', () => {
		WriteMapping(args.chart);
		expect(ApiObject.mock.calls.length).toEqual(3);
		expect(ApiObject).toHaveBeenCalledWith(dummyChart, mappingServices[0].name, {
			apiVersion: 'getambassador.io/v2',
			kind: 'Mapping',
			metadata: {
				name: mappingServices[0].name
			},
			spec: generateSpec(mappingServices[0].prefix)
		});

		expect(ApiObject).toHaveBeenCalledWith(dummyChart, mappingServices[1].name, {
			apiVersion: 'getambassador.io/v2',
			kind: 'Mapping',
			metadata: {
				name: mappingServices[1].name
			},
			spec: generateSpec(mappingServices[1].prefix)
		});

		expect(ApiObject).toHaveBeenCalledWith(dummyChart, mappingServices[2].name, {
			apiVersion: 'getambassador.io/v2',
			kind: 'Mapping',
			metadata: {
				name: mappingServices[2].name
			},
			spec: generateSpec(mappingServices[2].prefix)
		});
	});
});
