"use strict";

const logger = require("./nightcall/util/logger");
const {
  removeLaunchAgent,
  getLoadedLaunchAgents
} = require("./nightcall/proxy/osProxy")({ logger });
const {
  removeLogs,
  removeCache,
  removeLaunchAgentFile
} = require("./nightcall/proxy/fsProxy")({ logger });
const { BASE_AGENT_ID } = require("./nightcall/util/constants");

getLoadedLaunchAgents(BASE_AGENT_ID).then(loadedLaunchAgents => {
  const cleanUpPromises = [];
  loadedLaunchAgents.filter(e => !e.isRunning).forEach(({ id }) => {
    cleanUpPromises.push(removeLaunchAgent(id));
    cleanUpPromises.push(removeLaunchAgentFile(id));
  });
  Promise.all(cleanUpPromises).then(() => {
    removeLogs();
    removeCache();
  });
});
