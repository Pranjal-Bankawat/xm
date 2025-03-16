'use strict';

Object.assign(module.exports, {
	ContentEntityPackageFileAllowPattern: /application[/\\]sap-n-([a-z-]*|common[/\\][a-z]*)[/\\]content[/\\](entity)[/\\][a-zA-Z0-9-]*\.json$/,
	MetadataEntityPackageFileAllowPattern:
		/application[/\\]sap-n-([a-z-]*|common[/\\][a-z]*)[/\\]metadata[/\\](analyticalmodel|api|entity|event|eventtopic|service|uiview|uiapp)[/\\][a-zA-Z0-9-]*\.json$/,
	MetadataBusinessObjectPackageFileAllowPattern: /application[/\\]sap-n-([a-z-]*|common[/\\][a-z]*)[/\\]metadata[/\\](businessobject|datatype)[/\\][a-zA-Z0-9-]*\.json$/,
	MetadataServiceAdaptationPackageFileAllowPattern: /application[/\\]sap-n-([a-z-]*|common[/\\][a-z]*)[/\\]metadata[/\\](serviceadaptation)[/\\][a-zA-Z0-9-]*\.json$/,
	MetadataJSONFilePathAllowPattern:
		/[a-zA-Z0-9-]*[/\\](metadata|content)[/\\](analyticalmodel|api|businessobject|datatype|entity|event|eventtopic|messagegroup|service|serviceadaptation|task|uiview|uiapp|text)[/\\][a-zA-Z0-9-]+\.json$/,
	MetadataJSONFilePathBlockPattern: /[/\\]fixtures[/\\](metadata|content)[/\\]/
});
