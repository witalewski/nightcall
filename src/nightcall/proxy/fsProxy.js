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
  this.logger.info("Writing nightcall Launch Agent file...");
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
              this.logger.info("Nightcall Launch Agent file written.");
              resolve();
            }
          }
        );
      }
    });
  });
};

const removeLogs = async () => {
  this.logger.info("Removing Nightcall logs...");
  return new Promise((resolve, reject) => {
    fs.access(`nightcall.log`, fs.constants.F_OK, err => {
      if (err) {
        this.logger.info("No log file was present.");
        resolve();
      } else {
        fs.unlink(`nightcall.log`, err => {
          if (err) {
            this.logger.info("Failed to remove Nightcall logs file.");
            reject();
          } else {
            this.logger.info("Removed Nightcall logs file.");
            resolve();
          }
        });
      }
    });
  });
};

const removeCache = async () => {
  this.logger.info("Removing Nightcall cache directory...");
  return new Promise((resolve, reject) => {
    fs.access(`cache`, fs.constants.F_OK, err => {
      if (err) {
        this.logger.info("No cache directory was present.");
        resolve();
      } else {
        rimraf("cache", () => {
          this.logger.info("Successfully removed Nightcall cache directory.");
          resolve();
        });
      }
    });
  });
};

const removeLaunchAgentFile = () => {
  this.logger.info("Removing Nightcall Launch Agent file...");
  return new Promise((resolve, reject) => {
    fs.access(
      `${os.homedir()}/Library/LaunchAgents/tech.witalewski.nightcall.plist`,
      fs.constants.F_OK,
      err => {
        if (err) {
          this.logger.info("No Launch Agent file was present.");
          resolve();
        } else {
          fs.unlink(
            `${os.homedir()}/Library/LaunchAgents/tech.witalewski.nightcall.plist`,
            err => {
              if (err) {
                this.logger.error("Failed to remove Nightcall Launch Agent file.");
                reject();
              }
              this.logger.info("Removed Nightcall Launch Agent file.");
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
