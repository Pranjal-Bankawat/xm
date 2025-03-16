'use strict';
const TwoPhaseAsyncTask = require('@sapn/elsa-util-task/TwoPhaseAsync');

module.exports = {
	forwardServicePort: (serviceName, remotePortNumber, localPortNumber = 11004, namespace = 'default') => {
		const kubectlCommand = 'kubectl';
		const kubectlArgs = ['port-forward', '--namespace', namespace, `svc/${serviceName}`, `${localPortNumber}:${remotePortNumber}`];
		const kubectlTask = new TwoPhaseAsyncTask(kubectlCommand, kubectlArgs, { stdio: 'pipe' });
		const { startPromise, processPromise } = kubectlTask.run('Forwarding');

		return { kubectlTask, startPromise, processPromise };
	}
};
