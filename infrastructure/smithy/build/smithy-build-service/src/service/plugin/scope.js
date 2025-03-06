'use strict';

const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

const PLUGIN_NAME = 'elsa-service-scope';

module.exports = function scope(serviceManifest, workspace) {
	return {
		name: PLUGIN_NAME,
		setup(build) {
			build.onResolve({ filter: /^elsa\/scope$/ }, ({ path }) => {
				return { path, namespace: PLUGIN_NAME };
			});
			build.onLoad({ filter: /^elsa\/scope$/, namespace: PLUGIN_NAME }, async () => {
				const scopeTemplatePath = resolve(__dirname, 'scope.template.js');
				const scopeContents = (await readFile(scopeTemplatePath, 'utf-8')).split('\n');
				for (const serviceScopeExtensionImportPath of serviceManifest.scopeExtensions) {
					scopeContents.push(`scope.extensions.push(require('${serviceScopeExtensionImportPath}'));`);
				}
				for (const runtimeHookPluginPackageImportPath of serviceManifest.runtime.hooks) {
					scopeContents.push(`scope.plugins.push(require('${runtimeHookPluginPackageImportPath}'));`);
				}
				for (const runtimeRequestHandlerPluginPackageImportPath of serviceManifest.runtime.requestHandlers) {
					scopeContents.push(`scope.plugins.push(require('${runtimeRequestHandlerPluginPackageImportPath}'));`);
				}

				return {
					contents: scopeContents.join('\n'),
					resolveDir: workspace.location
				};
			});
		}
	};
};
