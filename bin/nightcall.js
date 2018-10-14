#!/usr/bin/env node
"use strict";

const uninstall = () => {
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

  getLoadedLaunchAgents().then(loadedLaunchAgents => {
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
};

const day = () => {
  const { DAY } = require("../src/nightcall/util/constants");
  require("../src").changeTheme(DAY);
};

const night = () => {
  const { NIGHT } = require("../src/nightcall/util/constants");
  require("../src").changeTheme(NIGHT);
};

const args = process.argv.splice(process.execArgv.length + 2);

switch (args[0]) {
  case "uninstall":
    uninstall();
    break;
  case "day":
    day();
    break;
  case "night":
    night();
    break;
  case "start":
    require("../src").performUpdate();
    break;
  default:
    require("./default");
    break;
}
