"use strict";

const crypto = require("crypto");

const findLocation = async () => {
  let ip,
    towers = [],
    location;

  try {
    ip = await this.getIP();
  } catch (err) {
    this.logger.error(err);
  }

  try {
    towers = await this.getWifiTowers();
  } catch (err) {
    this.logger.error(err);
  }

  location = getLocationFromCache(ip, towers);

  if (!location && towers.length) {
    try {
      location = await this.findLocationOfWifiTowers(towers);
    } catch (err) {
      this.logger.error(err);
    }
  }

  if (!location && ip) {
    try {
      location = await this.findLocationOfIP(ip);
    } catch (err) {
      this.logger.error(err);
    }
  }

  if (!location) {
    throw "Could not obtain public IP or Wifi APs. Please make sure Wifi is enabled and the computer is connected to the Internet.";
  }

  if (!location.foundInCache) {
    storeLocationInCache(ip, towers, location);
  }

  return location;
};

const getEnvironmentHash = (ip, towers) => {
  const hash = crypto.createHash("sha256");
  return hash
    .update(
      [
        ip,
        ...towers
          .sort((a, b) => b.signalStrength - a.signalStrength)
          .slice(0, 3)
          .map(({ macAddress }) => macAddress)
          .sort()
      ].join()
    )
    .digest("base64");
};

const getLocationFromCache = (ip, towers) => {
  const environmentHash = getEnvironmentHash(ip, towers);
  this.logger.debug(`Looking for ${environmentHash} in location cache...`);
  let location = this.state.getLocationData(environmentHash);

  if (location) {
    this.logger.debug(`Location found in cache: ${JSON.stringify(location)}`);
  }

  return location ? { ...location, foundInCache: true } : undefined;
};

const storeLocationInCache = (ip, towers, location) => {
  const environmentHash = getEnvironmentHash(ip, towers);
  this.state.setLocationData(environmentHash, location);
  this.logger.debug(`Location stored in cache: ${environmentHash}`);
};

module.exports = ({
  getIP,
  getWifiTowers,
  findLocationOfIP,
  findLocationOfWifiTowers,
  state,
  logger
}) => {
  this.getIP = getIP;
  this.getWifiTowers = getWifiTowers;
  this.findLocationOfIP = findLocationOfIP;
  this.findLocationOfWifiTowers = findLocationOfWifiTowers;
  this.state = state;
  this.logger = logger;

  return findLocation;
};
