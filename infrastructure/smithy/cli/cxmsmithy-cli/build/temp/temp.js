// Mock implementation of @sapn/elsa-build-service
const { execSync } = require('child_process');

module.exports = {
    smithyBuild: async function smithyBuild({ config, verbose, workspace }) {
        if (verbose) {
            console.log('Building workspace:', workspace.name);
        }
        console.log('Build config:', config);
        return Promise.resolve();
    },
    
    // Mock implementation of @sapn/elsa-build-service/service
    smithyBuildService: async function smithyBuildService({ verbose, workspace, legacy }) {
        if (verbose) {
            console.log('Building legacy service for workspace:', workspace.name);
        }
        return Promise.resolve();
    },
    
    // Mock implementation of @sapn/elsa-util-workspace/get
    smithyGetWorkspaces: function smithyGetWorkspaces(workspaceNames, options) {
        return workspaceNames.reduce((acc, name) => {
            acc[name] = { name, location: `./mock/path/${name}` };
            return acc;
        }, {});
    }
}
