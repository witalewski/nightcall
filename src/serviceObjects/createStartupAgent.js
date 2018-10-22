"use strict";

const {
  STARTUP_AGENT_ID,
  NIGHTCALL_DIR_PLACEHOLDER_REGEX
} = require("../util/constants");

const createStartupAgent = async () => {
  const contents = await this.readLaunchAgentTemplate(`${process.cwd()}/src/templates/startup.plist`);
  await this.writeLaunchAgentFile(
    STARTUP_AGENT_ID,
    contents
      .replace(NIGHTCALL_DIR_PLACEHOLDER_REGEX, process.cwd())
  );
  this.state.setAppState({ startupAgentCreated: true });
  this.logger.debug(`Created startup agent.`);
};

module.exports = ({ state, fsProxy, logger }) => {
  this.state = state;
  this.readLaunchAgentTemplate = fsProxy.readLaunchAgentTemplate;
  this.writeLaunchAgentFile = fsProxy.writeLaunchAgentFile;
  this.logger = logger;
  return createStartupAgent;
};
