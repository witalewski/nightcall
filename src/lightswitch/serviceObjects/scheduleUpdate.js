"use strict";

const {
  LIGHTSWITCH_DIR_PLACEHOLDER_REGEX,
  MINUTES_PLACEHOLDER_REGEX,
  HOURS_PLACEHOLDER_REGEX
} = require("../util/constants");

const scheduleUpdate = async date => {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  this.logger.info(`Scheduling next update to ${hours}:${minutes}`);

  const launchAgentLoaded = await this.isLaunchAgentLoaded();
  if (launchAgentLoaded) {
    await this.removeLaunchAgent();
    await this.removeLaunchAgentFile();
  }

  return new Promise((resolve, reject) => {
    this.readLaunchAgentTemplate()
      .then(contents => {
        this.writeLaunchAgentFile(
          contents
            .replace(LIGHTSWITCH_DIR_PLACEHOLDER_REGEX, process.cwd())
            .replace(MINUTES_PLACEHOLDER_REGEX, minutes)
            .replace(HOURS_PLACEHOLDER_REGEX, hours)
        )
          .then(() => {
            this.loadLaunchAgent()
              .then(() => {
                this.logger.info(`Update scheduled for ${date}.`);
                resolve();
              })
              .catch(err => {
                this.logger.error("Failed to schedule update.");
                reject(err);
              });
          })
          .catch(err => {
            this.logger.error("Failed to schedule update.");
            reject(err);
          });
      })
      .catch(err => {
        this.logger.error("Failed to schedule update.");
        reject(err);
      });
  });
};

module.exports = ({ osProxy, fsProxy, logger }) => {
  this.loadLaunchAgent = osProxy.loadLaunchAgent;
  this.isLaunchAgentLoaded = osProxy.isLaunchAgentLoaded;
  this.removeLaunchAgent = osProxy.removeLaunchAgent;
  this.readLaunchAgentTemplate = fsProxy.readLaunchAgentTemplate;
  this.writeLaunchAgentFile = fsProxy.writeLaunchAgentFile;
  this.removeLaunchAgentFile = fsProxy.removeLaunchAgentFile;
  this.logger = logger;
  return scheduleUpdate;
};
