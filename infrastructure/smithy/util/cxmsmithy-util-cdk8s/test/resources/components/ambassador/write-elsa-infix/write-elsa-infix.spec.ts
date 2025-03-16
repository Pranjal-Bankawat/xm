export class DummyChart {}

describe('deployment/deployment', () => {
	let args;
	let dummyChart;
	let WriteElsaInfixMapping, ApiObject;

	function generateSpec() {
		return {
			method: '(POST|PUT|PATCH|DELETE)',
			method_regex: true,
			prefix: '/elsa/',
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
		const { createWriteElsaInfixMapping } = await import('../../../../../src/resources/components/ambassador/write-elsa-infix/write-elsa-infix');
		WriteElsaInfixMapping = createWriteElsaInfixMapping;
	});
	beforeEach(() => {
		ApiObject.mockClear();
		dummyChart = new DummyChart();
		args = { chart: dummyChart, appName: 'my-app' };

		args.options = {
			serviceNames: ['elsa-grpc', 'elsa-web']
		};
	});

	it('shall create write elsa infix mapping', () => {
		WriteElsaInfixMapping(args.chart);
		expect(ApiObject.mock.calls.length).toEqual(1);
		expect(ApiObject).toHaveBeenCalledWith(dummyChart, 'elsa-web-write-mapping', {
			apiVersion: 'getambassador.io/v2',
			kind: 'Mapping',
			metadata: {
				name: 'elsa-web-write-mapping'
			},
			spec: generateSpec()
		});
	});
});
