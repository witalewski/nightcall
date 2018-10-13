"use strict";

const logger = require("../src/nightcall/util/logger");
const {
  removeLaunchAgent,
  getLoadedLaunchAgents
} = require("../src/nightcall/proxy/osProxy")({ logger });
const {
  removeLogs,
  removeCache,
  removeLaunchAgentFile
} = require("../src/nightcall/proxy/fsProxy")({ logger });
const { BASE_AGENT_ID } = require("../src/nightcall/util/constants");

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
