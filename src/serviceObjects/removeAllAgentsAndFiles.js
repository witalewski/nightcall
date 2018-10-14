const removeAllAgentsAndFiles = () =>
  new Promise((resolve, reject) => {
    this.getLoadedLaunchAgents().then(loadedLaunchAgents => {
      const cleanUpPromises = [];
      loadedLaunchAgents.filter(e => !e.isRunning).forEach(({ id }) => {
        cleanUpPromises.push(this.removeLaunchAgent(id));
        cleanUpPromises.push(this.removeLaunchAgentFile(id));
      });
      Promise.all(cleanUpPromises).then(() => {
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
