'use strict';

const { resolve } = require('node:path');
const workspaceRootDirectory = resolve(__dirname, '../../../../../');

module.exports = {
	'@sapn/assert': {
		context: 'core/sap-n-assert',
		location: resolve(workspaceRootDirectory, 'core/sap-n-assert'),
		name: '@sapn/assert',
		root: workspaceRootDirectory,
		version: '1.2.3',
		dependencies: Object.assign(
			[
				{
					name: '@sapn/type',
					location: resolve(workspaceRootDirectory, 'core/sap-n-type'),
					context: 'core/sap-n-type'
				}
			],
			{
				internal: {
					package: ['@sapn/type'],
					transient: []
				},
				external: {
					package: [],
					transient: []
				},
				production: {
					internal: {
						package: ['@sapn/type'],
						transient: []
					},
					external: {
						package: [],
						transient: []
					}
				}
			}
		),
		elsa: {
			context: 'core/sap-n-assert',
			owner: ['core']
		},
		nx: {
			targets: {
				sonar: {
					coverage: true,
					lint: true
				}
			}
		}
	},
	'@sapn/common-ui': {
		context: 'common-ui',
		location: resolve(workspaceRootDirectory, 'common-ui'),
		name: '@sapn/common-ui',
		root: workspaceRootDirectory,
		version: '1.2.3',
		dependencies: Object.assign(
			[
				{
					context: 'core/sap-n-fetch',
					location: resolve(workspaceRootDirectory, 'core/sap-n-fetch'),
					name: '@sapn/fetch'
				}
			],
			{
				internal: {
					package: ['@sapn/fetch'],
					transient: []
				},
				external: {
					package: ['@angular-architects/module-federation', '@angular-architects/module-federation-tools', 'abort-controller', 'node-fetch', 'zone.js'],
					transient: ['abort-controller', 'node-fetch']
				},
				production: {
					internal: {
						package: [],
						transient: []
					},
					external: {
						package: ['@angular-architects/module-federation', '@angular-architects/module-federation-tools', 'zone.js'],
						required: ['abort-controller', 'node-fetch'],
						transient: []
					}
				}
			}
		),
		elsa: {
			context: 'common-ui',
			owner: ['uidev', 'core', 'repository'],
			deployableType: 'ui',
			name: 'elsa-common-ui',
			moduleName: 'elsa',
			projectName: 'elsa-common-ui',
			moduleOwner: 'someOwner@sap.com',
			s3UploadUIPath: 'mfe/v2/modules/elsa/sap-n-common-ui',
			s3UploadManifestPath: 'v2/elsa',
			security: {
				whitesource: {
					productToken: 'someProductToken'
				},
				ppmsId: '--TBD--'
			}
		},
		nx: {
			targets: {
				build: {
					outputDirectory: 'common-ui/dist'
				},
				sonar: {
					coverage: true,
					lint: true
				}
			}
		}
	},
	'@sapn/dummy': {
		context: 'core/sap-n-dummy',
		location: resolve(workspaceRootDirectory, 'core/sap-n-dummy'),
		name: '@sapn/dummy',
		root: workspaceRootDirectory,
		version: '1.2.3',
		dependencies: Object.assign([], {
			internal: { package: [], transient: [] },
			external: { package: [], transient: [] },
			production: {
				internal: { package: [], transient: [] },
				external: { package: [], transient: [] }
			}
		}),
		elsa: {
			context: 'core/sap-n-dummy'
		},
		nx: {
			targets: {}
		}
	},
	'@sapn/elsa': {
		context: 'infrastructure/sap-n-elsa',
		location: resolve(workspaceRootDirectory, 'infrastructure/sap-n-elsa'),
		name: '@sapn/elsa',
		root: workspaceRootDirectory,
		version: '1.2.3',
		dependencies: Object.assign(
			[
				{
					name: '@sapn/assert',
					location: resolve(workspaceRootDirectory, 'core/sap-n-assert'),
					context: 'core/sap-n-assert'
				},
				{
					name: '@sapn/type',
					location: resolve(workspaceRootDirectory, 'core/sap-n-type'),
					context: 'core/sap-n-type'
				}
			],
			{
				internal: {
					package: ['@sapn/assert', '@sapn/type'],
					transient: ['@sapn/type']
				},
				external: {
					package: ['@grpc/grpc-js', 'express'],
					transient: []
				},
				production: {
					internal: {
						package: ['@sapn/assert', '@sapn/type'],
						transient: ['@sapn/type']
					},
					external: {
						package: ['@grpc/grpc-js', 'express'],
						required: [],
						transient: []
					}
				}
			}
		),
		elsa: {
			build: {
				type: 'alpine',
				overwrites: {
					buildEnvironmentVariables: {},
					additionalNpmDependencies: []
				}
			},
			context: 'infrastructure/sap-n-elsa',
			delivery: {
				integrationTests: [
					{
						label: 'IT Label',
						npmPackageName: 'someNpmPackageName',
						targets: ['test:it']
					}
				]
			},
			deployableType: 'service',
			image: {
				includes: 'infrastructure/sap-n-elsa/*,infrastructure/sap-n-elsa/dist/**',
				name: {
					base: 'elsa'
				}
			},
			manifest: {
				basePath: 'infrastructure/sap-n-elsa/k8s/base',
				imageName: 'c4c.common.repositories.cloud.sap/elsa',
				includes: [
					'infrastructure/sap-n-elsa/k8s/staging/aws/**/manifest.yaml',
					'infrastructure/sap-n-elsa/k8s/pre-prod/aws/**/manifest.yaml',
					'infrastructure/sap-n-elsa/k8s/prod/aws/**/manifest.yaml'
				],
				paths: ['infrastructure/sap-n-elsa/k8s/staging/aws', 'infrastructure/sap-n-elsa/k8s/pre-prod/aws', 'infrastructure/sap-n-elsa/k8s/prod/aws'],
				s3UploadPath: 'v2/elsa'
			},
			moduleName: 'elsa',
			moduleOwner: 'someOwner@sap.com',
			name: 'elsa',
			owner: ['core'],
			projectName: 'elsa-service',
			security: {
				checkmarxProjectName: 'someElsaCheckmarxProjectName',
				cumulus: {
					pipelineId: 'someElsaPipelineId'
				},
				ppmsId: 'someElsaPPMSId',
				protecodeGroupId: 'someElsaProtecodeGroupId',
				sonar: true,
				whitesource: {
					productToken: 'someElsaProductToken'
				}
			}
		},
		nx: {
			targets: {
				build: {
					outputDirectory: 'infrastructure/sap-n-elsa/dist'
				},
				sonar: {
					coverage: true,
					lint: true
				}
			}
		}
	},
	'@sapn/elsa-cli': {
		context: 'infrastructure/elsa/cli/elsa-cli',
		location: resolve(workspaceRootDirectory, 'infrastructure/elsa/cli/elsa-cli'),
		name: '@sapn/elsa-cli',
		root: workspaceRootDirectory,
		version: '1.2.3',
		dependencies: Object.assign(
			[
				{
					name: '@sapn/elsa-util',
					location: resolve(workspaceRootDirectory, 'infrastructure/elsa/util/elsa-util'),
					context: 'infrastructure/elsa/util/elsa-util'
				},
				{
					context: 'core/sap-n-fetch',
					location: resolve(workspaceRootDirectory, 'core/sap-n-fetch'),
					name: '@sapn/fetch'
				}
			],
			{
				internal: {
					package: ['@sapn/elsa-util'],
					transient: ['@sapn/fetch']
				},
				external: {
					package: ['@octokit/rest', 'aws-sdk', 'chalk', 'eslint', 'glob', 'grpc-tools', 'minimatch', 'pg', 'rimraf', 'semver', 'ts-protoc-gen', 'yargs'],
					transient: [
						'abort-controller',
						'case-sensitive-paths-webpack-plugin',
						'eslint',
						'form-data',
						'loader-utils',
						'minimatch',
						'mocha',
						'node-fetch',
						'rimraf',
						'semver',
						'util',
						'webpack',
						'webpack-merge',
						'webpack-node-externals',
						'webpack-sources'
					]
				},
				production: {
					internal: {
						package: ['@sapn/elsa-util'],
						transient: ['@sapn/fetch']
					},
					external: {
						package: ['@octokit/rest', 'aws-sdk', 'chalk', 'eslint', 'glob', 'grpc-tools', 'minimatch', 'pg', 'rimraf', 'semver', 'ts-protoc-gen', 'yargs'],
						transient: [
							'abort-controller',
							'case-sensitive-paths-webpack-plugin',
							'eslint',
							'form-data',
							'loader-utils',
							'minimatch',
							'mocha',
							'node-fetch',
							'rimraf',
							'semver',
							'util',
							'webpack',
							'webpack-merge',
							'webpack-node-externals',
							'webpack-sources'
						]
					}
				}
			}
		),
		elsa: {
			context: 'infrastructure/elsa/cli/elsa-cli',
			owner: ['owner', 'core']
		},
		nx: {
			targets: {
				sonar: {
					coverage: true,
					lint: true
				}
			}
		}
	},
	'@sapn/elsa-job': {
		context: 'infrastructure/sap-n-elsa-job',
		elsa: {
			build: {
				type: 'alpine',
				overwrites: {
					buildEnvironmentVariables: {},
					additionalNpmDependencies: []
				}
			},
			context: 'infrastructure/sap-n-elsa-job',
			deployableType: 'job',
			image: {
				includes: 'infrastructure/sap-n-elsa-job/*,infrastructure/sap-n-elsa-job/dist/**',
				name: {
					base: 'elsa-job'
				}
			},
			manifest: {
				basePath: 'infrastructure/sap-n-elsa-job/k8s/base',
				imageName: 'c4c.common.repositories.cloud.sap/elsa-job',
				includes: [],
				paths: [],
				replacements: [
					{
						parameterName: 'PARAMETER',
						placeholderName: 'PLACEHOLDER'
					}
				],
				s3UploadPath: 'v2/elsa'
			},
			moduleName: 'elsa',
			moduleOwner: 'someOwner@sap.com',
			name: 'elsa-job',
			owner: ['core'],
			projectName: 'elsa-job',
			security: {
				checkmarxProjectName: 'someElsaJobCheckmarxProjectName',
				cumulus: {
					pipelineId: 'someElsaJobPipelineId'
				},
				ppmsId: 'someElsaJobPPMSId',
				protecodeGroupId: 'someElsaJobProtecodeGroupId',
				sonar: true,
				whitesource: {
					productToken: 'someElsaJobProductToken'
				}
			}
		},
		dependencies: Object.assign([], {
			internal: { package: [], transient: [] },
			external: {
				package: ['@grpc/grpc-js'],
				transient: []
			},
			production: {
				internal: { package: [], transient: [] },
				external: { package: ['@grpc/grpc-js'], required: [], transient: [] }
			}
		}),
		location: resolve(workspaceRootDirectory, 'infrastructure/sap-n-elsa-job'),
		name: '@sapn/elsa-job',
		root: workspaceRootDirectory,
		version: '1.2.3',
		nx: {
			targets: {
				build: {
					outputDirectory: 'infrastructure/sap-n-elsa-job/dist'
				},
				sonar: {
					coverage: false,
					lint: false
				}
			}
		}
	},
	'@sapn/elsa-k8s': {
		context: 'infrastructure/sap-n-elsa-k8s',
		location: resolve(workspaceRootDirectory, 'infrastructure/sap-n-elsa-k8s'),
		name: '@sapn/elsa-k8s',
		root: workspaceRootDirectory,
		version: '1.2.3',
		dependencies: Object.assign([], {
			internal: { package: [], transient: [] },
			external: { package: [], transient: [] },
			production: {
				internal: { package: [], transient: [] },
				external: { package: [], transient: [] }
			}
		}),
		nx: {
			targets: {
				build: {
					outputDirectory: 'infrastructure/sap-n-elsa-k8s/dist'
				},
				sonar: {
					coverage: false,
					lint: false
				}
			}
		},
		elsa: {
			deployableType: 'elsa',
			context: 'infrastructure/sap-n-elsa-k8s',
			owner: ['core'],
			name: 'elsa-k8s',
			moduleName: 'elsa',
			projectName: 'elsa-k8s',
			manifest: {
				paths: [
					'infrastructure/sap-n-elsa-k8s/k8s/**/dev/aws',
					'infrastructure/sap-n-elsa-k8s/k8s/**/staging/aws',
					'infrastructure/sap-n-elsa-k8s/k8s/**/pre-prod/aws',
					'infrastructure/sap-n-elsa-k8s/k8s/**/prod/aws'
				],
				includes: [
					'infrastructure/sap-n-elsa-k8s/k8s/**/dev/aws/**/manifest.yaml',
					'infrastructure/sap-n-elsa-k8s/k8s/**/staging/aws/**/manifest.yaml',
					'infrastructure/sap-n-elsa-k8s/k8s/**/pre-prod/aws/**/manifest.yaml',
					'infrastructure/sap-n-elsa-k8s/k8s/**/prod/aws/**/manifest.yaml'
				],
				s3UploadPath: 'v2/elsa'
			}
		}
	},
	'@sapn/elsa-util': {
		context: 'infrastructure/elsa/util/elsa-util',
		location: resolve(workspaceRootDirectory, 'infrastructure/elsa/util/elsa-util'),
		name: '@sapn/elsa-util',
		root: workspaceRootDirectory,
		version: '1.2.3',
		dependencies: Object.assign(
			[
				{
					name: '@sapn/fetch',
					location: resolve(workspaceRootDirectory, 'core/sap-n-fetch'),
					context: 'core/sap-n-fetch'
				}
			],
			{
				internal: {
					package: ['@sapn/fetch'],
					transient: []
				},
				external: {
					package: [
						'abort-controller',
						'case-sensitive-paths-webpack-plugin',
						'eslint',
						'form-data',
						'loader-utils',
						'minimatch',
						'mocha',
						'node-fetch',
						'rimraf',
						'semver',
						'util',
						'webpack',
						'webpack-merge',
						'webpack-node-externals',
						'webpack-sources'
					],
					transient: ['abort-controller', 'node-fetch']
				},
				production: {
					internal: {
						package: ['@sapn/fetch'],
						transient: []
					},
					external: {
						package: [
							'abort-controller',
							'case-sensitive-paths-webpack-plugin',
							'eslint',
							'form-data',
							'loader-utils',
							'minimatch',
							'mocha',
							'node-fetch',
							'rimraf',
							'semver',
							'util',
							'webpack',
							'webpack-merge',
							'webpack-node-externals',
							'webpack-sources'
						],
						transient: ['abort-controller', 'node-fetch']
					}
				}
			}
		),
		elsa: {
			context: 'infrastructure/elsa/util/elsa-util',
			owner: ['core']
		},
		nx: {
			targets: {
				sonar: {
					coverage: true,
					lint: true
				}
			}
		}
	},
	'@sapn/fetch': {
		context: 'core/sap-n-fetch',
		location: resolve(workspaceRootDirectory, 'core/sap-n-fetch'),
		name: '@sapn/fetch',
		root: workspaceRootDirectory,
		version: '1.2.3',
		dependencies: Object.assign([], {
			internal: { package: [], transient: [] },
			external: {
				package: ['abort-controller', 'node-fetch'],
				transient: []
			},
			production: {
				internal: {
					package: [],
					transient: []
				},
				external: {
					package: ['abort-controller', 'node-fetch'],
					required: [],
					transient: []
				}
			}
		}),
		elsa: {
			context: 'core/sap-n-fetch',
			owner: ['core']
		},
		nx: {
			targets: {
				sonar: {
					coverage: true,
					lint: true
				}
			}
		}
	},
	'@sapn/type': {
		context: 'core/sap-n-type',
		location: resolve(workspaceRootDirectory, 'core/sap-n-type'),
		name: '@sapn/type',
		root: workspaceRootDirectory,
		version: '1.2.3',
		dependencies: Object.assign([], {
			internal: { package: [], transient: [] },
			external: { package: [], transient: [] },
			production: {
				internal: { package: [], transient: [] },
				external: { package: [], transient: [] }
			}
		}),
		elsa: {
			context: 'core/sap-n-type',
			owner: ['core']
		},
		nx: {
			targets: {
				sonar: {
					coverage: true,
					lint: true
				}
			}
		}
	},
	'@sapn/ui': {
		context: 'ui',
		location: resolve(workspaceRootDirectory, 'ui'),
		name: '@sapn/ui',
		root: workspaceRootDirectory,
		version: '1.2.3',
		dependencies: Object.assign(
			[
				{
					context: 'core/sap-n-fetch',
					location: resolve(workspaceRootDirectory, 'core/sap-n-fetch'),
					name: '@sapn/fetch'
				}
			],
			{
				internal: {
					package: ['@sapn/fetch'],
					transient: []
				},
				external: {
					package: ['@angular-architects/module-federation', '@angular-architects/module-federation-tools', 'abort-controller', 'node-fetch', 'zone.js'],
					transient: ['abort-controller', 'node-fetch']
				},
				production: {
					internal: {
						package: [],
						transient: []
					},
					external: {
						package: ['@angular-architects/module-federation', '@angular-architects/module-federation-tools', 'zone.js'],
						required: ['abort-controller', 'node-fetch'],
						transient: []
					}
				}
			}
		),
		elsa: {
			context: 'ui',
			owner: ['uidev', 'core', 'repository'],
			deployableType: 'ui',
			name: 'elsa-ui',
			moduleName: 'elsa',
			projectName: 'elsa-ui',
			moduleOwner: 'someOwner@sap.com',
			s3UploadUIPath: 'mfe/v2/modules/elsa/ui',
			s3UploadManifestPath: 'v2/elsa',
			security: {
				whitesource: {
					productToken: 'someProductToken'
				},
				ppmsId: '--TBD--'
			}
		},
		nx: {
			targets: {
				build: {
					outputDirectory: 'ui/dist'
				},
				sonar: {
					coverage: true,
					lint: true
				}
			}
		}
	}
};
