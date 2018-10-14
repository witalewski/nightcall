#!/usr/bin/env node
"use strict";

const start = () => {
  require("../src").performUpdate();
};

const day = () => {
  const { DAY } = require("../src/nightcall/util/constants");
  require("../src").changeTheme(DAY);
};

const night = () => {
  const { NIGHT } = require("../src/nightcall/util/constants");
  require("../src").changeTheme(NIGHT);
};

const uninstall = () => {
  require("../src").removeAllAgentsAndFiles();
};

const defaultFunc = () => {};

const args = process.argv.splice(process.execArgv.length + 2);

switch (args[0]) {
  case "start":
    start();
    break;
  case "day":
    day();
    break;
  case "night":
    night();
    break;
  case "uninstall":
    uninstall();
    break;
  default:
    defaultFunc();
    break;
}
