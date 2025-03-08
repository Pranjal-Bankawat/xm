'use strict';

const { resolve } = require('path');

module.exports = new Map([
    [
        'bin',
        {
            stdin: {
                contents: `#!/usr/bin/env node
const yargs = require('yargs');

yargs
  .command('build', 'Run the build process', {}, () => console.log('Building...'))
  .command('test', 'Run tests', {}, () => console.log('Running tests...'))
  .demandCommand(1)
  .help()
  .argv;
`,
                resolveDir: __dirname,
                sourcefile: 'cli.json',
                loader: 'js'
            },
            platform: 'node',
            bundle: true,
            minify: false,
            keepNames: true,
            outfile: resolve(__dirname, './dist/mock-cli.js'),
            plugins: []
        }
    ],
    [
        'package',
        {
            entryPoints: ['./package.json'],
            minify: false,
            platform: 'node',
            outfile: resolve(__dirname, './dist/package.json'),
            plugins: [
                {
                    name: 'package-json',
                    setup(build) {
                        build.onLoad({ filter: /package\.json$/ }, async ({ path }) => {
                            const packageData = require(path);
                            const modifiedPackageJson = {
                                name: packageData.name,
                                version: packageData.version,
                                description: packageData.description,
                                bin: { mockcli: './mock-cli.js' },
                                files: ['mock-cli.js'],
                                dependencies: { lodash: '^4.17.21' }
                            };

                            return { contents: JSON.stringify(modifiedPackageJson, null, 2), loader: 'copy' };
                        });
                    }
                }
            ]
        }
    ]
]);
