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
  this.logger.info("Writing lightswitch Launch Agent file...");
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
                "Failer writing lightswitch Launch Agent file."
              );
              reject(err);
            } else {
              this.logger.info("Lightswitch Launch Agent file written.");
              resolve();
            }
          }
        );
      }
    });
  });
};

const removeLogs = async () => {
  this.logger.info("Removing Lightswitch logs...");
  return new Promise((resolve, reject) => {
    fs.access(`lightswitch.log`, fs.constants.F_OK, err => {
      if (err) {
        this.logger.info("No log file was present.");
        resolve();
      } else {
        fs.unlink(`lightswitch.log`, err => {
          if (err) {
            this.logger.info("Failed to remove Lightswitch logs file.");
            reject();
          } else {
            this.logger.info("Removed Lightswitch logs file.");
            resolve();
          }
        });
      }
    });
  });
};

const removeCache = async () => {
  this.logger.info("Removing Lightswitch cache directory...");
  return new Promise((resolve, reject) => {
    fs.access(`cache`, fs.constants.F_OK, err => {
      if (err) {
        this.logger.info("No cache directory was present.");
        resolve();
      } else {
        rimraf("cache", () => {
          this.logger.info("Successfully removed Lightswitch cache directory.");
          resolve();
        });
      }
    });
  });
};

const removeLaunchAgentFile = () => {
  this.logger.info("Removing Lightswitch Launch Agent file...");
  return new Promise((resolve, reject) => {
    fs.access(
      `${os.homedir()}/Library/LaunchAgents/tech.witalewski.lightswitch.plist`,
      fs.constants.F_OK,
      err => {
        if (err) {
          this.logger.info("No Launch Agent file was present.");
          resolve();
        } else {
          fs.unlink(
            `${os.homedir()}/Library/LaunchAgents/tech.witalewski.lightswitch.plist`,
            err => {
              if (err) {
                this.logger.error("Failed to remove Lightswitch Launch Agent file.");
                reject();
              }
              this.logger.info("Removed Lightswitch Launch Agent file.");
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
