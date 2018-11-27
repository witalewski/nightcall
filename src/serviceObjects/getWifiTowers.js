"use strict";

const logger = require("../util/logger");
const wifiScanner = require("node-wifiscanner");

const getWifiTowers = () => {
  logger.debug("Looking for WiFi towers...");
  return new Promise((resolve, reject) => {
    wifiScanner.scan((err, towers) => {
      if (err) {
        reject(err);
      } else {
        logger.debug(`WiFi towers found: ${towers.length}`);
        resolve(
          towers.map(e => {
            return { macAddress: e.mac, signalStrength: e["signal_level"] };
          })
        );
      }
    });
  });
};

module.exports = getWifiTowers;
