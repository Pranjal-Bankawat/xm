// Mock implementation of @sapn/elsa-build-service
module.exports = async function smithyBuild({ config, verbose, workspace }) {
    if (verbose) {
        console.log('Building workspace:', workspace.name);
    }
    console.log('Build config:', config);
    return Promise.resolve();
};

// Mock implementation of @sapn/elsa-build-service/service
module.exports.service = async function smithyBuildService({ verbose, workspace, legacy }) {
    if (verbose) {
        console.log('Building legacy service for workspace:', workspace.name);
    }
    return Promise.resolve();
};

// Mock implementation of @sapn/elsa-util-workspace/get
module.exports = function smithyGetWorkspaces(workspaceNames, options) {
    return workspaceNames.reduce((acc, name) => {
        acc[name] = { name, location: `/mock/path/${name}` };
        return acc;
    }, {});
};
