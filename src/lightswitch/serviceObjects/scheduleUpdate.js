"use strict";

const {
  BASE_AGENT_ID,
  AUX_AGENT_ID,
  LIGHTSWITCH_DIR_PLACEHOLDER_REGEX,
  AGENT_ID_PLACEHOLDER_REGEX,
  MINUTES_PLACEHOLDER_REGEX,
  HOURS_PLACEHOLDER_REGEX
} = require("../util/constants");

const scheduleUpdate = async date => {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  this.logger.info(`Scheduling next update to ${hours}:${minutes}`);

  this.logger.debug(`Current pid: ${process.pid}`);
  const loadedLaunchAgents = await this.getLoadedLaunchAgents(BASE_AGENT_ID);

  const cleanUpPromises = [];
  loadedLaunchAgents.filter(e => !e.isRunning).forEach(({ id }) => {
    cleanUpPromises.push(this.removeLaunchAgent(id));
    cleanUpPromises.push(this.removeLaunchAgentFile(id));
  });
  await Promise.all(cleanUpPromises);

  const currentlyRunningAgent = loadedLaunchAgents.find(
    ({ isRunning }) => isRunning
  );
  const targetAgentId =
    currentlyRunningAgent && currentlyRunningAgent.id === BASE_AGENT_ID
      ? AUX_AGENT_ID
      : BASE_AGENT_ID;

  return new Promise((resolve, reject) => {
    this.readLaunchAgentTemplate("template.plist")
      .then(contents => {
        this.writeLaunchAgentFile(
          targetAgentId,
          contents
            .replace(LIGHTSWITCH_DIR_PLACEHOLDER_REGEX, process.cwd())
            .replace(AGENT_ID_PLACEHOLDER_REGEX, targetAgentId)
            .replace(MINUTES_PLACEHOLDER_REGEX, minutes)
            .replace(HOURS_PLACEHOLDER_REGEX, hours)
        )
          .then(() => {
            this.loadLaunchAgent(targetAgentId)
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
  this.getLoadedLaunchAgents = osProxy.getLoadedLaunchAgents;
  this.removeLaunchAgent = osProxy.removeLaunchAgent;
  this.readLaunchAgentTemplate = fsProxy.readLaunchAgentTemplate;
  this.writeLaunchAgentFile = fsProxy.writeLaunchAgentFile;
  this.removeLaunchAgentFile = fsProxy.removeLaunchAgentFile;
  this.logger = logger;
  return scheduleUpdate;
};
