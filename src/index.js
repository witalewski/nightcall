"use strict";

const logger = require("./util/logger");
const LocalStorage = require("node-localstorage").LocalStorage;
const state = require("./state")(new LocalStorage(`${process.cwd()}/cache`));
const getIP = require("./serviceObjects/getIP");
const findLocationOfIP = require("./serviceObjects/findLocationOfIP");
const getWifiTowers = require("./serviceObjects/getWifiTowers");
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
const changeHyperTheme = require("./serviceObjects/changeHyperTheme")({
  osProxy,
  fsProxy,  
  logger
});
const changeTheme = require("./serviceObjects/changeTheme")({
  osProxy,
  state,
  writeWatchfile,
  changeHyperTheme,
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
const pauseUpdates = require("./serviceObjects/pauseUpdates")({state});
const resumeUpdates = require("./serviceObjects/resumeUpdates")({state});

module.exports = {
  performUpdate,
  changeTheme,
  removeAllAgentsAndFiles,
  setLocation,
  displayHelp,
  createStartupAgent,
  pauseUpdates,
  resumeUpdates
};
