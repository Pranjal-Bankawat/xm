export class DummyChart {}

describe('deployment/deployment', () => {
	let args;
	let dummyChart;
	let ReadElsaInfixMapping, ApiObject;

	function generateSpec() {
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

	beforeAll(async () => {
		ApiObject = jest.fn();
		jest.doMock('cdk8s', () => {
			return {
				ApiObject: ApiObject
			};
		});
		const { createReadElsaInfixMapping } = await import('../../../../../src/resources/components/ambassador/read-elsa-infix/read-elsa-infix');
		ReadElsaInfixMapping = createReadElsaInfixMapping;
	});
	beforeEach(() => {
		ApiObject.mockClear();
		dummyChart = new DummyChart();
		args = { chart: dummyChart, appName: 'my-app' };

		args.options = {
			serviceNames: ['elsa-grpc', 'elsa-web']
		};
	});

	it('shall create read elsa infix mapping', () => {
		ReadElsaInfixMapping(args.chart);
		expect(ApiObject.mock.calls.length).toEqual(1);
		expect(ApiObject).toHaveBeenCalledWith(dummyChart, 'elsa-web-read-mapping', {
			apiVersion: 'getambassador.io/v2',
			kind: 'Mapping',
			metadata: {
				name: 'elsa-web-read-mapping'
			},
			spec: generateSpec()
		});
	});
});
