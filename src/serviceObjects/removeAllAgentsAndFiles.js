const removeAllAgentsAndFiles = () => new Promise((resolve, reject) => {
  const {
    removeLaunchAgent,
    getLoadedLaunchAgents
  } = require("../src/nightcall/proxy/osProxy")({ logger: this.logger });
  const {
    removeLogs,
    removeCache,
    removeLaunchAgentFile
  } = require("../src/nightcall/proxy/fsProxy")({ logger: this.logger });

  getLoadedLaunchAgents().then(loadedLaunchAgents => {
    const cleanUpPromises = [];
    loadedLaunchAgents.filter(e => !e.isRunning).forEach(({ id }) => {
      cleanUpPromises.push(removeLaunchAgent(id));
      cleanUpPromises.push(removeLaunchAgentFile(id));
    });
    Promise.all(cleanUpPromises).then(() => {
      removeLogs();
      removeCache();
      resolve();
    });
  });
});

module.exports = logger => {
    this.logger = logger;
    return removeAllAgentsAndFiles;
};