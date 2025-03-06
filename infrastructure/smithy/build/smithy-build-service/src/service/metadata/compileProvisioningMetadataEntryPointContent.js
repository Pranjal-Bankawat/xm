'use strict';

const { relative, resolve, join } = require('node:path');
const { pathToFileURL } = require('node:url');
const { METADATA_DIRECTORY_NAME, CONTENT_DIRECTORY_NAME } = require('./Constant');

const PROVISIONING_METADATA_ENTRYPOINT_CONTENT_HEADER = `'use strict';
const packagePluginMap = new Map();
`;

const PROVISIONING_METADATA_ENTRYPOINT_CONTENT_FOOTER = `
module.exports = function plugin(register) {
	for(const [packageName, { metadataMap, contentMap, routes, version }] of packagePluginMap) {
		register(packageName, {
			get version() {
				return version;
			},
			get content() {
				return contentMap;
			},
			get metadata() {
				return metadataMap;
			},
			get routes() {
				return routes;
			}
		});
	}
};
`;

function compilePackageMetadataEntryPointContent(provisioningMetadataEntryPointContent, packageName, packagePath, metadata, cwd) {
	provisioningMetadataEntryPointContent.push(
		`packagePluginMap.get('${packageName}').routes.push([new RegExp('^${packageName}/metadata/(.*)$'), ([,resource]) => packagePluginMap.get('${packageName}').metadataMap.get(\`./\${resource}\`)]);`
	);
	const { pathname: packageMetadataPathFileURLPathname } = pathToFileURL(resolve(packagePath, METADATA_DIRECTORY_NAME));
	for (const [metadataType, metadataFiles] of Object.entries(metadata)) {
		for (const metadataFile of metadataFiles) {
			const absoluteMetadataFilePath = resolve(packagePath, METADATA_DIRECTORY_NAME, metadataType, metadataFile);
			const { pathname: metadataFileUrlPathname } = pathToFileURL(absoluteMetadataFilePath);
			const metadataModuleKey = metadataFileUrlPathname.replace(packageMetadataPathFileURLPathname, '.');
			const metadataFilePath = relative(cwd, absoluteMetadataFilePath);
			provisioningMetadataEntryPointContent.push(`packagePluginMap.get('${packageName}').metadataMap.set('${metadataModuleKey}', require('${metadataFilePath}'));`);
		}
	}
}

function compilePackageContentEntryPointContent(provisioningMetadataEntryPointContent, packageName, packagePath, content, cwd) {
	const { pathname: packageContentPathFileURLPathname } = pathToFileURL(join(packagePath, CONTENT_DIRECTORY_NAME));
	for (const [contentType, contentFiles] of Object.entries(content)) {
		for (const contentFile of contentFiles) {
			const absoluteContentFilePath = resolve(packagePath, CONTENT_DIRECTORY_NAME, contentType, contentFile);
			const { pathname: contentFileUrlPathname } = pathToFileURL(absoluteContentFilePath);
			const contentModuleKey = contentFileUrlPathname.replace(packageContentPathFileURLPathname, '.');
			const contentFilePath = relative(cwd, absoluteContentFilePath);
			provisioningMetadataEntryPointContent.push(`packagePluginMap.get('${packageName}').contentMap.set('${contentModuleKey}', require('${contentFilePath}'));`);
		}
	}
}

module.exports = function compileProvisioningMetadataEntryPointContent(metadataFilePathsPerPackage, cwd) {
	const provisioningMetadataEntryPointContent = [PROVISIONING_METADATA_ENTRYPOINT_CONTENT_HEADER];

	for (const [packageName, { content = {}, metadata = {}, packagePath, packageVersion }] of Object.entries(metadataFilePathsPerPackage)) {
		provisioningMetadataEntryPointContent.push(`packagePluginMap.set('${packageName}', {
			metadataMap: new Map(),
			contentMap: new Map(),
			version: '${packageVersion}',
			routes: []
		});`);
		compilePackageMetadataEntryPointContent(provisioningMetadataEntryPointContent, packageName, packagePath, metadata, cwd);
		compilePackageContentEntryPointContent(provisioningMetadataEntryPointContent, packageName, packagePath, content, cwd);
	}

	provisioningMetadataEntryPointContent.push(PROVISIONING_METADATA_ENTRYPOINT_CONTENT_FOOTER);
	return provisioningMetadataEntryPointContent.join('\n');
};
