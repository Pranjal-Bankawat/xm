'use strict';

const { resolve } = require('node:path');

module.exports = {
	name: 'com.sap.n',
	problems: [`extraneous: __ngcc_entry_points__.json@ ${resolve(__dirname, '../../../../node_modules/__ngcc_entry_points__.json')}`],
	dependencies: {
		'__ngcc_entry_points__.json': {
			extraneous: true,
			problems: [`extraneous: __ngcc_entry_points__.json@ ${resolve(__dirname, '../../../../node_modules/__ngcc_entry_points__.json')}`]
		},
		'@sapn/assert': {
			version: '1.2.3',
			resolved: 'file:../../core/sap-n-assert',
			dependencies: {
				'@sapn/type': {
					version: '1.2.3'
				}
			}
		},
		'@sapn/dummy': {
			version: '1.2.3',
			resolved: 'file:../../core/sap-n-dummy'
		},
		'@sapn/elsa': {
			version: '1.2.3',
			resolved: 'file:../../infrastructure/sap-n-elsa',
			dependencies: {
				'@grpc/grpc-js': {
					version: '1.6.12',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/@grpc/grpc-js/-/grpc-js-1.6.12.tgz'
				},
				'@sapn/assert': {
					version: '1.2.3'
				},
				'@sapn/type': {
					version: '1.2.3'
				},
				express: {
					version: '4.18.1',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/express/-/express-4.18.1.tgz'
				}
			}
		},
		'@sapn/elsa-cli': {
			version: '1.2.3',
			resolved: 'file:../../infrastructure/elsa/cli/elsa-cli',
			dependencies: {
				'@octokit/rest': {
					version: '18.12.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/@octokit/rest/-/rest-18.12.0.tgz'
				},
				'@sapn/elsa-util': {
					version: '1.2.3'
				},
				'aws-sdk': {
					version: '2.1211.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/aws-sdk/-/aws-sdk-2.1211.0.tgz'
				},
				chalk: {
					version: '4.1.2',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/chalk/-/chalk-4.1.2.tgz'
				},
				eslint: {
					version: '8.23.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/eslint/-/eslint-8.23.0.tgz'
				},
				glob: {
					version: '7.2.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/glob/-/glob-7.2.0.tgz'
				},
				'grpc-tools': {
					version: '1.11.2',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/grpc-tools/-/grpc-tools-1.11.2.tgz'
				},
				minimatch: {
					version: '3.0.5',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/minimatch/-/minimatch-3.0.5.tgz'
				},
				pg: {
					version: '8.8.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/pg/-/pg-8.8.0.tgz'
				},
				rimraf: {
					version: '3.0.2',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/rimraf/-/rimraf-3.0.2.tgz'
				},
				semver: {
					version: '7.3.7',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/semver/-/semver-7.3.7.tgz'
				},
				'ts-protoc-gen': {
					version: '0.15.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/ts-protoc-gen/-/ts-protoc-gen-0.15.0.tgz'
				},
				yargs: {
					version: '17.5.1',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/yargs/-/yargs-17.5.1.tgz'
				}
			}
		},
		'@sapn/elsa-job': {
			version: '1.2.3',
			resolved: 'file:../../infrastructure/sap-n-elsa-job',
			dependencies: {
				'@grpc/grpc-js': {
					version: '1.6.12',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/@grpc/grpc-js/-/grpc-js-1.6.12.tgz'
				}
			}
		},
		'@sapn/elsa-k8s': {
			version: '1.2.3',
			resolved: 'file:../../infrastructure/sap-n-elsa-k8s'
		},
		'@sapn/elsa-util': {
			version: '1.2.3',
			resolved: 'file:../../infrastructure/elsa/util/elsa-util',
			dependencies: {
				'@sapn/fetch': {
					version: '1.2.3'
				},
				'abort-controller': {
					version: '3.0.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/abort-controller/-/abort-controller-3.0.0.tgz'
				},
				'case-sensitive-paths-webpack-plugin': {
					version: '2.4.0',
					resolved:
						'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/case-sensitive-paths-webpack-plugin/-/case-sensitive-paths-webpack-plugin-2.4.0.tgz'
				},
				eslint: {
					version: '8.23.0'
				},
				'form-data': {
					version: '4.0.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/form-data/-/form-data-4.0.0.tgz'
				},
				'loader-utils': {
					version: '2.0.2',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/loader-utils/-/loader-utils-2.0.2.tgz'
				},
				minimatch: {
					version: '3.0.5'
				},
				mocha: {
					version: '9.2.2',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/mocha/-/mocha-9.2.2.tgz'
				},
				'node-fetch': {
					version: '2.6.7',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/node-fetch/-/node-fetch-2.6.7.tgz'
				},
				rimraf: {
					version: '3.0.2'
				},
				semver: {
					version: '7.3.7'
				},
				util: {
					version: '0.11.1',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/util/-/util-0.11.1.tgz'
				},
				'webpack-merge': {
					version: '5.8.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/webpack-merge/-/webpack-merge-5.8.0.tgz'
				},
				'webpack-node-externals': {
					version: '3.0.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/webpack-node-externals/-/webpack-node-externals-3.0.0.tgz'
				},
				'webpack-sources': {
					version: '3.2.3',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/webpack-sources/-/webpack-sources-3.2.3.tgz'
				},
				webpack: {
					version: '5.74.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/webpack/-/webpack-5.74.0.tgz'
				}
			}
		},
		'@sapn/fetch': {
			version: '1.2.3',
			resolved: 'file:../../core/sap-n-fetch',
			dependencies: {
				'abort-controller': {
					version: '3.0.0'
				},
				'node-fetch': {
					version: '2.6.7'
				}
			}
		},
		'@sapn/type': {
			version: '1.2.3',
			resolved: 'file:../../core/sap-n-type'
		},
		'@sapn/ui': {
			version: '1.2.3',
			resolved: 'file:../../ui',
			dependencies: {
				'@angular-architects/module-federation-tools': {
					version: '14.3.10',
					resolved:
						'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/@angular-architects/module-federation-tools/-/module-federation-tools-14.3.10.tgz'
				},
				'@angular-architects/module-federation': {
					version: '14.3.10',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/@angular-architects/module-federation/-/module-federation-14.3.10.tgz'
				},
				'@sapn/fetch': {
					version: '1.2.3'
				},
				'abort-controller': {
					version: '3.0.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/abort-controller/-/abort-controller-3.0.0.tgz'
				},
				'node-fetch': {
					version: '2.6.7',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/node-fetch/-/node-fetch-2.6.7.tgz'
				},
				'zone.js': {
					version: '0.11.8',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/zone.js/-/zone.js-0.11.8.tgz'
				}
			}
		},
		'@sapn/common-ui': {
			version: '1.2.3',
			resolved: 'file:../../common-ui',
			dependencies: {
				'@angular-architects/module-federation-tools': {
					version: '14.3.10',
					resolved:
						'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/@angular-architects/module-federation-tools/-/module-federation-tools-14.3.10.tgz'
				},
				'@angular-architects/module-federation': {
					version: '14.3.10',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/@angular-architects/module-federation/-/module-federation-14.3.10.tgz'
				},
				'@sapn/fetch': {
					version: '1.2.3'
				},
				'abort-controller': {
					version: '3.0.0',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/abort-controller/-/abort-controller-3.0.0.tgz'
				},
				'node-fetch': {
					version: '2.6.7',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/node-fetch/-/node-fetch-2.6.7.tgz'
				},
				'zone.js': {
					version: '0.11.8',
					resolved: 'https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/zone.js/-/zone.js-0.11.8.tgz'
				}
			}
		}
	}
};
