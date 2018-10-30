#!/usr/bin/env node
"use strict";

const fs = require("fs");
process.chdir(fs.realpathSync(`${__dirname}/..`));

const nightcall = require("../src");
const { DAY, NIGHT } = require("../src/util/constants");

const args = process.argv.splice(process.execArgv.length + 2);

switch (args[0]) {
  case "start":
    nightcall.performUpdate();
    break;
  case "day":
    nightcall.changeTheme(DAY);
    break;
  case "night":
    nightcall.changeTheme(NIGHT);
    break;
  case "location":
    nightcall.setLocation(...args.splice(1));
    break;
  case "uninstall":
    nightcall.removeAllAgentsAndFiles();
    break;
  case "pause":
    nightcall.pauseUpdates();
    break;
  case "resume":
    nightcall.resumeUpdates();
    break;
  case "help":
  default:
    nightcall.displayHelp();
    break;
}
