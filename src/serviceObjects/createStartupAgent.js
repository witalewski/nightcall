"use strict";

const {
  STARTUP_AGENT_ID,
  NIGHTCALL_DIR_PLACEHOLDER_REGEX,
  AGENT_ID_PLACEHOLDER_REGEX,
  RUN_AT_LOAD_REGEX,
  CALENDAR_INTERVAL_SECTION_REGEX
} = require("../util/constants");

const createStartupAgent = async () => {
  const contents = await this.readLaunchAgentTemplate("template.plist");
  await this.writeLaunchAgentFile(
    STARTUP_AGENT_ID,
    contents
      .replace(NIGHTCALL_DIR_PLACEHOLDER_REGEX, process.cwd())
      .replace(AGENT_ID_PLACEHOLDER_REGEX, STARTUP_AGENT_ID)
      .replace(RUN_AT_LOAD_REGEX, true)
      .replace(CALENDAR_INTERVAL_SECTION_REGEX, "")
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
