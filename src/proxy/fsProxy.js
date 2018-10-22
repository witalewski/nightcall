"use strict";

const fs = require("fs");
const os = require("os");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");

const readLaunchAgentTemplate = async path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, contents) => {
      if (err || !contents) {
        reject(err);
      } else {
        resolve(contents);
      }
    });
  });
};

const writeFile = async (path, contents) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, contents, err => {
      if (err) {
        this.logger.error(`Failed to write file: ${path}`);
        reject(err);
      } else {
        this.logger.debug(`File written: ${path}`);
        resolve();
      }
    });
  });

const writeLaunchAgentFile = async (agentId, contents) => {
  this.logger.debug("Writing nightcall Launch Agent file...");
  return new Promise((resolve, reject) => {
    mkdirp(`${os.homedir()}/Library/LaunchAgents`, err => {
      if (err) {
        reject(err);
      } else {
        writeFile(
          `${os.homedir()}/Library/LaunchAgents/${agentId}.plist`,
          contents
        )
          .then(resolve)
          .catch(reject);
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

const removeLaunchAgentFile = id => {
  this.logger.debug("Removing Nightcall Launch Agent file...");
  return new Promise((resolve, reject) => {
    fs.access(
      `${os.homedir()}/Library/LaunchAgents/${id}.plist`,
      fs.constants.F_OK,
      err => {
        if (err) {
          this.logger.debug("No Launch Agent file was present.");
          resolve();
        } else {
          fs.unlink(`${os.homedir()}/Library/LaunchAgents/${id}.plist`, err => {
            if (err) {
              this.logger.error(
                "Failed to remove Nightcall Launch Agent file."
              );
              reject();
            }
            this.logger.debug("Removed Nightcall Launch Agent file.");
            resolve();
          });
        }
      }
    );
  });
};

module.exports = ({ logger }) => {
  this.logger = logger;
  return {
    readLaunchAgentTemplate,
    writeFile,
    writeLaunchAgentFile,
    removeLogs,
    removeCache,
    removeLaunchAgentFile
  };
};
