"use strict";

const childProcess = require("child_process");
const os = require("os");
const { AGENT_REGEX } = require("../util/constants");

const loadLaunchAgent = async agentId => {
  this.logger.info("Loading Lightswitch Launch Agent...");
  return new Promise((resolve, reject) => {
    childProcess.exec(
      `launchctl load ${os.homedir()}/Library/LaunchAgents/${agentId}.plist`,
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

const removeLaunchAgent = async agentId => {
  this.logger.info("Removing lightswitch Launch Agent...");
  return new Promise((resolve, reject) => {
    childProcess.exec(
      `launchctl unload ${os.homedir()}/Library/LaunchAgents/${agentId}.plist`,
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

const getLoadedLaunchAgents = async () => {
  this.logger.info("Checking if Lightswitch user agent is loaded...");
  return new Promise((resolve, reject) => {
    childProcess.exec(
      "launchctl list | grep local.lightswitch",
      {},
      (error, stdout, stderr) => {
        if (stdout) {
          const agents = stdout
            .split("\n")
            .filter(({ length }) => length)
            .map(line => {
              let pid,
                isRunning = false;
              const pidMatches = line.match(/^\d+/);
              if (pidMatches) {
                pid = pidMatches[0];
                isRunning = true;
              }
              const id = line.match(AGENT_REGEX)[0];
              return { pid, id, isRunning };
            });
          if (agents) {
            this.logger.info(
              `Lightswitch launch agents loaded: ${JSON.stringify(agents)}`
            );
          } else {
            this.logger.info("No lightswitch agents loaded.");
          }
          resolve(agents);
        } else {
          this.logger.info("No lightswitch agents loaded.");
          resolve([]);
        }
      }
    );
  });
};

const showDialog = async msg => {
  return new Promise((resolve, reject) => {
    childProcess.exec(
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
    childProcess.exec(
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
    getLoadedLaunchAgents,
    showDialog,
    setOSDarkMode
  };
};
