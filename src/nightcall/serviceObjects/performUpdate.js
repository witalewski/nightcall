"use strict";

const suncalc = require("suncalc");

const { NIGHT, DAY, RETRY_TIMEOUT } = require("../util/constants");

const performUpdateWithLocation = location => {
  let { sunrise, sunset } = suncalc.getTimes(
    new Date(),
    location.lat,
    location.lng
  );

  this.state.setAppState({
    location,
    sunrise,
    sunset
  });

  this.logger.debug(`Daytime for ${location.lat},${location.lng}:`);
  this.logger.debug(`Sunrise: ${sunrise}`);
  this.logger.debug(`Sunset: ${sunset}`);

  const now = new Date();
  if (now < sunrise || now > sunset) {
    this.changeTheme(NIGHT);
    // this.scheduleUpdate(sunrise);
  } else {
    this.changeTheme(DAY);
    // this.scheduleUpdate(sunset);
  }
  this.scheduleUpdate(new Date(Date.now() + 60 * 1000));

  this.logger.debug(`Update took ${Date.now() - this.updateTimer} ms`);
};

const performUpdate = () => {
  this.showDialog("Nightcall update");
  this.updateTimer = Date.now();
  this.logger.debug("Updating data...");

  this.state.getAppState().then(appState => {
    if (appState.locationSetManually) {
      performUpdateWithLocation(appState.location);
    } else {
      this.findLocation()
        .then(location => performUpdateWithLocation(location))
        .catch(() => {
          const nextUpdate = new Date(Date.now() + RETRY_TIMEOUT);
          this.logger.debug(
            `Unable to find location. Next retry: ${nextUpdate}`
          );
          this.scheduleUpdate(nextUpdate);
        });
    }
  });
};

module.exports = ({
  state,
  findLocation,
  changeTheme,
  scheduleUpdate,
  osProxy,
  logger
}) => {
  this.state = state;
  this.findLocation = findLocation;
  this.changeTheme = changeTheme;
  this.scheduleUpdate = scheduleUpdate;
  this.showDialog = osProxy.showDialog;
  this.logger = logger;

  return performUpdate;
};
