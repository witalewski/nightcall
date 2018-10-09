"use strict";

const { exec } = require("child_process");
const os = require("os");

const loadLaunchAgent = async () => {
  this.logger.info("Loading Lightswitch Launch Agent...");
  return new Promise((resolve, reject) => {
    exec(
      `launchctl load ${os.homedir()}/Library/LaunchAgents/tech.witalewski.lightswitch.plist`,
      {},
      (error, stdout, stderr) => {
        if (error || stdout || stderr) {
          reject(error, stdout, stderr);
          this.logger.error("Lightswitch Launch Agent failed to load.");
        } else {
          this.logger.info("Lightswitch Launch Agent loaded.");
          resolve();
        }
      }
    );
  });
};

const removeLaunchAgent = async () => {
  this.logger.info("Removing lightswitch Launch Agent...");
  return new Promise((resolve, reject) => {
    exec(
      "launchctl remove tech.witalewski.lightswitch",
      {},
      (error, stdout, stderr) => {
        if (error || stdout || stderr) {
          this.logger.error(error, stdout, stderr);
          reject(error, stdout, stderr);
        } else {
          this.logger.info("Lightswitch Launch Agent removed.");
          resolve();
        }
      }
    );
  });
};

const isLaunchAgentLoaded = async () => {
  this.logger.info("Checking if Lightswitch user agent is loaded...");
  return new Promise((resolve, reject) => {
    exec(
      "launchctl list | grep tech.witalewski.lightswitch",
      {},
      (error, stdout, stderr) => {
        if (stdout) {
          this.logger.info("Lightswitch launch agent is loaded.");
          resolve(true);
        } else {
          this.logger.info("Lightswitch launch agent isn't loaded.");
          resolve(false);
        }
      }
    );
  });
};

const showDialog = async msg => {
  return new Promise((resolve, reject) => {
    exec(
      `osascript -e 'tell app "System Events" to display dialog "${msg}" with title "Lightswitch"'`,
      {},
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject();
        }
        resolve();
      }
    );
  });
};

const setOSDarkMode = value => {
  return new Promise((resolve, reject) => {
    exec(
      `osascript -e 'tell application "System Events" to tell appearance preferences to set dark mode to ${value}'`,
      {},
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject();
        }
        resolve();
      }
    );
  });
};

module.exports = ({ logger }) => {
  this.logger = logger;
  return {
    loadLaunchAgent,
    removeLaunchAgent,
    isLaunchAgentLoaded,
    showDialog,
    setOSDarkMode
  };
};
