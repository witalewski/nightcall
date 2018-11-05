"use strict";

const { NIGHT } = require("../util/constants");

const changeTheme = theme => {
  this.logger.debug(`Setting ${theme === NIGHT ? "dark" : "light"} theme`);

  this.setOSDarkMode(theme === NIGHT);
  this.state.setAppState({ theme });
  this.writeWatchfile(theme);
  this.changeHyperTheme(theme);
};

module.exports = ({ osProxy, state, writeWatchfile, changeHyperTheme, logger }) => {
  this.setOSDarkMode = osProxy.setOSDarkMode;
  this.state = state;
  this.writeWatchfile = writeWatchfile;
  this.changeHyperTheme = changeHyperTheme;
  this.logger = logger;

  return changeTheme;
};
