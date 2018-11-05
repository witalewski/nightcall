"use strict";

const childProcess = require("child_process");
const os = require("os");
const { AGENT_REGEX } = require("../util/constants");

const loadLaunchAgent = async agentId => {
  this.logger.debug("Loading Nightcall Launch Agent...");
  return new Promise((resolve, reject) => {
    childProcess.exec(
      `launchctl load ${os.homedir()}/Library/LaunchAgents/${agentId}.plist`,
      {},
      (error, stdout, stderr) => {
        if (error || stdout || stderr) {
          reject(error, stdout, stderr);
          this.logger.error("Nightcall Launch Agent failed to load.");
        } else {
          this.logger.debug("Nightcall Launch Agent loaded.");
          resolve();
        }
      }
    );
  });
};

const removeLaunchAgent = async agentId => {
  this.logger.debug("Removing nightcall Launch Agent...");
  return new Promise((resolve, reject) => {
    childProcess.exec(
      `launchctl unload ${os.homedir()}/Library/LaunchAgents/${agentId}.plist`,
      {},
      (error, stdout, stderr) => {
        if (error || stdout || stderr) {
          this.logger.error(error, stdout, stderr);
          reject(error, stdout, stderr);
        } else {
          this.logger.debug("Nightcall Launch Agent removed.");
          resolve();
        }
      }
    );
  });
};

const getLoadedLaunchAgents = async () => {
  this.logger.debug("Checking if Nightcall user agent is loaded...");
  return new Promise((resolve, reject) => {
    childProcess.exec(
      "launchctl list | grep local.nightcall",
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

          this.logger.debug(
            `Nightcall launch agents loaded: ${JSON.stringify(agents)}`
          );
          resolve(agents);
        } else {
          this.logger.debug("No nightcall agents loaded.");
          resolve([]);
        }
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

const getHomeDir = () => os.homedir();

module.exports = ({ logger }) => {
  this.logger = logger;
  return {
    loadLaunchAgent,
    removeLaunchAgent,
    getLoadedLaunchAgents,
    setOSDarkMode,
    getHomeDir
  };
};
