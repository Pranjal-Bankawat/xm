'use strict';

const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

const PLUGIN_NAME = 'elsa-service-manifest';

module.exports = function manifest(serviceManifest, workspace) {
	return {
		name: PLUGIN_NAME,
		setup(build) {
			build.onResolve({ filter: /^elsa\/manifest$/ }, ({ path }) => {
				return { path, namespace: PLUGIN_NAME };
			});
			build.onLoad({ filter: /^elsa\/manifest$/, namespace: PLUGIN_NAME }, async () => {
				const manifestTemplatePath = resolve(__dirname, 'manifest.template.js');
				const manifestContents = (await readFile(manifestTemplatePath, 'utf-8')).split('\n');

				for (const name of serviceManifest.deployment?.setup ?? []) {
					manifestContents.push(`deploymentRegistry.setup.push(require("${name}"));`);
				}
				for (const name of serviceManifest.deployment?.teardown ?? []) {
					manifestContents.push(`deploymentRegistry.teardown.push(require("${name}"));`);
				}

				manifestContents.push(`manifest.profile.branding.theme = ${JSON.stringify(serviceManifest.branding.theme)};`);
				manifestContents.push(`manifest.profile.branding.logo = require(${JSON.stringify(serviceManifest.development.branding.logo)});`);
				for (const { name } of serviceManifest.api?.event ?? []) {
					manifestContents.push(`apiRegistry.event.push(require("${name}"));`);
				}
				for (const { name } of serviceManifest.api?.grpc ?? []) {
					manifestContents.push(`apiRegistry.grpc.push(require("${name}"));`);
				}
				for (const { name } of serviceManifest.api?.rest ?? []) {
					manifestContents.push(`apiRegistry.rest.push(require("${name}"));`);
				}

				return {
					contents: manifestContents.join('\n'),
					resolveDir: workspace.location
				};
			});
		}
	};
};
