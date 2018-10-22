"use strict";

const logger = require("./util/logger");
const LocalStorage = require("node-localstorage").LocalStorage;
const state = require("./state")(new LocalStorage(`${process.cwd()}/cache`));
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
)({
  // proxied by default, change url to https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_KEY to use google apis directly
  url:
    "https://qw6c0mxwz9.execute-api.eu-west-1.amazonaws.com/default/lightswitch",
  apiKey: "S0a5WCywb68N075YgoTVK3TidPB11bus2vplyW9s"
});
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
const writeWatchfile = require("./serviceObjects/writeWatchfile")({ fsProxy });
const changeTheme = require("./serviceObjects/changeTheme")({
  osProxy,
  state,
  writeWatchfile,
  logger
});
const scheduleUpdate = require("./serviceObjects/scheduleUpdate")({
  state,
  osProxy,
  fsProxy,
  logger
});
const createStartupAgent = require("./serviceObjects/createStartupAgent")({
  state,
  fsProxy,
  logger
});
const performUpdate = require("./serviceObjects/performUpdate")({
  state,
  createStartupAgent,
  findLocation,
  changeTheme,
  scheduleUpdate,
  logger
});
const setLocation = require("./ui/setLocation")({ state, performUpdate });
const displayHelp = require("./ui/displayHelp");

module.exports = {
  performUpdate,
  changeTheme,
  removeAllAgentsAndFiles,
  setLocation,
  displayHelp,
  createStartupAgent
};
