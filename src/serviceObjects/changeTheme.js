"use strict";

const { NIGHT } = require("../util/constants");

const changeTheme = theme => {
  this.logger.debug(`Setting ${theme === NIGHT ? "dark" : "light"} theme`);

  this.setOSDarkMode(theme === NIGHT);
  this.state.setAppState({ theme });
  this.writeWatchfile(theme);

  this.showDialog(`Setting ${theme === NIGHT ? "dark" : "light"} theme`);
};

module.exports = ({ osProxy, state, writeWatchfile, logger }) => {
  this.setOSDarkMode = osProxy.setOSDarkMode;
  this.showDialog = osProxy.showDialog;
  this.state = state;
  this.writeWatchfile = writeWatchfile;
  this.logger = logger;

  return changeTheme;
};
