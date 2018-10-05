#!/usr/bin/env node
"use strict";

const args = process.argv.splice(process.execArgv.length + 2);

switch (args[0]) {
  case "uninstall":
    require("./uninstall");
    break;
  case "stop":
    require("./stop");
    break;
  case "start":
    require("./start");
    break;
  default:
    require("./default");
    break;
}
