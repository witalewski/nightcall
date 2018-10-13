"use strict";

const fs = require("fs");
const os = require("os");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");

const readLaunchAgentTemplate = async path => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path,
      "utf8",
      (err, contents) => {
        if (err || !contents) {
          reject(err);
        } else {
          resolve(contents);
        }
      }
    );
  });
};

const writeLaunchAgentFile = async (agentId, contents) => {
  this.logger.debug("Writing nightcall Launch Agent file...");
  return new Promise((resolve, reject) => {
    mkdirp(`${os.homedir()}/Library/LaunchAgents`, err => {
      if (err) {
        reject(err);
      } else {
        fs.writeFile(
          `${os.homedir()}/Library/LaunchAgents/${agentId}.plist`,
          contents,
          err => {
            if (err) {
              this.logger.error(
                "Failer writing nightcall Launch Agent file."
              );
              reject(err);
            } else {
              this.logger.debug("Nightcall Launch Agent file written.");
              resolve();
            }
          }
        );
      }
    });
  });
};

const removeLogs = async () => {
  this.logger.debug("Removing Nightcall logs...");
  return new Promise((resolve, reject) => {
    fs.access(`nightcall.log`, fs.constants.F_OK, err => {
      if (err) {
        this.logger.debug("No log file was present.");
        resolve();
      } else {
        fs.unlink(`nightcall.log`, err => {
          if (err) {
            this.logger.debug("Failed to remove Nightcall logs file.");
            reject();
          } else {
            this.logger.debug("Removed Nightcall logs file.");
            resolve();
          }
        });
      }
    });
  });
};

const removeCache = async () => {
  this.logger.debug("Removing Nightcall cache directory...");
  return new Promise((resolve, reject) => {
    fs.access(`cache`, fs.constants.F_OK, err => {
      if (err) {
        this.logger.debug("No cache directory was present.");
        resolve();
      } else {
        rimraf("cache", () => {
          this.logger.debug("Successfully removed Nightcall cache directory.");
          resolve();
        });
      }
    });
  });
};

const removeLaunchAgentFile = () => {
  this.logger.debug("Removing Nightcall Launch Agent file...");
  return new Promise((resolve, reject) => {
    fs.access(
      `${os.homedir()}/Library/LaunchAgents/tech.witalewski.nightcall.plist`,
      fs.constants.F_OK,
      err => {
        if (err) {
          this.logger.debug("No Launch Agent file was present.");
          resolve();
        } else {
          fs.unlink(
            `${os.homedir()}/Library/LaunchAgents/tech.witalewski.nightcall.plist`,
            err => {
              if (err) {
                this.logger.error("Failed to remove Nightcall Launch Agent file.");
                reject();
              }
              this.logger.debug("Removed Nightcall Launch Agent file.");
              resolve();
            }
          );
        }
      }
    );
  });
};

module.exports = ({ logger }) => {
  this.logger = logger;
  return {
    readLaunchAgentTemplate,
    writeLaunchAgentFile,
    removeLogs,
    removeCache,
    removeLaunchAgentFile
  };
};
