"use strict";

const { NIGHT } = require("../util/constants");

const changeHyperTheme = theme => {
  const hyperConfigPath = `${this.osProxy.getHomeDir()}/.hyper.js-nonexistent`;
  const solarizedDarkPattern = /(\/\/\s*)?(\"|\')hyper-solarized(\"|\')/;
  const solarizedLightPattern = /(\/\/\s*)?(\"|\')hyper-solarized-light(\"|\')/;
  this.fsProxy.readFile(hyperConfigPath).then(contents => {
    if (theme === NIGHT) {
      contents = contents.replace(solarizedDarkPattern, '"hyper-solarized"');
      contents = contents.replace(
        solarizedLightPattern,
        '//\t"hyper-solarized-light"'
      );
    } else {
      contents = contents.replace(
        solarizedDarkPattern,
        '//\t"hyper-solarized"'
      );
      contents = contents.replace(
        solarizedLightPattern,
        '"hyper-solarized-light"'
      );
    }
    this.fsProxy.writeFile(hyperConfigPath, contents);
  }).catch(e => this.logger.debug("No hyper configuration found."));
};

module.exports = ({ osProxy, fsProxy, logger }) => {
  this.osProxy = osProxy;
  this.fsProxy = fsProxy;
  this.logger = logger;

  return changeHyperTheme;
};
