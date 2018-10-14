#!/usr/bin/env node
"use strict";

const uninstall = () => {
  require("../src").removeAllAgentsAndFiles();
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
