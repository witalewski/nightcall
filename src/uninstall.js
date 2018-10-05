"use strict";

const {
  removeLaunchAgent,
  isLaunchAgentLoaded
} = require("./lightswitch/proxy/osProxy");
const {
  removeLogs,
  removeCache,
  removeLaunchAgentFile
} = require("./lightswitch/proxy/fsProxy");

isLaunchAgentLoaded().then(async launchAgentLoaded => {
  if (launchAgentLoaded) {
    await removeLaunchAgent();
  }
  removeLaunchAgentFile();
  removeLogs();
  removeCache();
});
