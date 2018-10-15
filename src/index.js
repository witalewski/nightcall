const logger = require("./util/logger");
const LocalStorage = require("node-localstorage").LocalStorage;
const state = require("./state")(new LocalStorage("./cache"));
const getIP = require("./serviceObjects/getIP")({
  publicIP: require("public-ip"),
  logger
});
const findLocationOfIP = require("./serviceObjects/findLocationOfIP")({
  logger
});
const getWifiTowers = require("./serviceObjects/getWifiTowers")({
  wifiScanner: require("node-wifiscanner"),
  logger
});
const findLocationOfWifiTowers = require("./serviceObjects/findLocationOfWifiTowers")(
  {
    logger
  }
);
const findLocation = require("./serviceObjects/findLocation")({
  getIP,
  getWifiTowers,
  findLocationOfIP,
  findLocationOfWifiTowers,
  state,
  logger
});
const osProxy = require("./proxy/osProxy")({ logger });
const fsProxy = require("./proxy/fsProxy")({ logger });
const removeAllAgentsAndFiles = require("./serviceObjects/removeAllAgentsAndFiles")(
  { osProxy, fsProxy, logger }
);
const changeTheme = require("./serviceObjects/changeTheme")({
  osProxy,
  state,
  logger
});
const scheduleUpdate = require("./serviceObjects/scheduleUpdate")({
  state,
  osProxy,
  fsProxy,
  logger
});
const performUpdate = require("./serviceObjects/performUpdate")({
  state,
  findLocation,
  changeTheme,
  scheduleUpdate,
  osProxy,
  logger
});
const setLocation = require("./ui/setLocation")({ state, performUpdate });

module.exports = {
  performUpdate,
  changeTheme,
  removeAllAgentsAndFiles,
  setLocation
};
