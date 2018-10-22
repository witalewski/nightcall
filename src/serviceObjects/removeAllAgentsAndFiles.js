const { STARTUP_AGENT_ID } = require("../util/constants");

const removeAllAgentsAndFiles = () =>
  new Promise((resolve, reject) => {
    this.getLoadedLaunchAgents().then(loadedLaunchAgents => {
      const cleanUpPromises = [];
      loadedLaunchAgents.forEach(({ id }) => {
        cleanUpPromises.push(this.removeLaunchAgent(id));
      });
      Promise.all(cleanUpPromises).then(() => {
        [...loadedLaunchAgents, { id: STARTUP_AGENT_ID }].forEach(({ id }) => {
          this.removeLaunchAgentFile(id);
        });
        this.removeLogs();
        this.removeCache();
        resolve();
      });
    });
  });

module.exports = ({ osProxy, fsProxy, logger }) => {
  this.getLoadedLaunchAgents = osProxy.getLoadedLaunchAgents;
  this.removeLaunchAgent = osProxy.removeLaunchAgent;
  this.removeLaunchAgentFile = fsProxy.removeLaunchAgentFile;
  this.removeLogs = fsProxy.removeLogs;
  this.removeCache = fsProxy.removeCache;
  this.logger = logger;
  return removeAllAgentsAndFiles;
};
