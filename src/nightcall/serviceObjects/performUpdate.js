"use strict";

const suncalc = require("suncalc");

const { TWENTY_FOUR_HOURS, NIGHT, DAY, RETRY_TIMEOUT } = require("../util/constants");

const performUpdateWithLocation = location => {
  this.state.setAppState({ location });

  const { sunrise, sunset } = suncalc.getTimes(
    new Date(),
    location.lat,
    location.lng
  );
  const sunriseTomorrow = suncalc.getTimes(new Date(Date.now() + TWENTY_FOUR_HOURS), location.lat, location.lng).sunrise;

  this.logger.debug(`Daytime for ${location.lat},${location.lng}:`);
  this.logger.debug(`Sunrise today: ${sunrise}`);
  this.logger.debug(`Sunset today: ${sunset}`);
  this.logger.debug(`Sunrise tomorrow: ${sunriseTomorrow}`);

  this.logger.info(JSON.stringify({
    location,
    time: Date.now(),
    sunrise: sunrise.getTime(),
    sunset: sunset.getTime(),
    sunriseTomorrow: sunriseTomorrow.getTime()
  }));

  const now = new Date();
  if (now < sunrise) {
    this.changeTheme(NIGHT);
    this.scheduleUpdate(sunrise);
  } else if (now < sunset) {
    this.changeTheme(DAY);
    this.scheduleUpdate(sunset);
  } else {
    this.changeTheme(NIGHT);
    this.scheduleUpdate(sunriseTomorrow);
  }
  // this.scheduleUpdate(new Date(Date.now() + 60 * 1000));

  this.logger.debug(`Update took ${Date.now() - this.updateTimer} ms`);
};

const performUpdate = () => {
  this.showDialog("Nightcall update");
  this.updateTimer = Date.now();
  this.logger.debug("Updating data...");

  const appState = this.state.getAppState();
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
