"use strict";

const { NIGHT } = require("../util/constants");

const changeTheme = theme => {
  this.logger.info(`Setting ${theme === NIGHT ? "dark" : "light"} theme`);

  this.setOSDarkMode(theme === NIGHT);

  this.state.setAppState({ theme });

  this.showDialog(`Setting ${theme === NIGHT ? "dark" : "light"} theme`);
};

module.exports = ({ osProxy, state, logger }) => {
  this.setOSDarkMode = osProxy.setOSDarkMode;
  this.showDialog = osProxy.showDialog;
  this.state = state;
  this.logger = logger;

  return changeTheme;
};
