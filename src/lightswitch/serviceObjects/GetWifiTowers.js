"use strict";

const getWifiTowers = () => {
  this.logger.info("Looking for WiFi towers...");
  return new Promise((resolve, reject) => {
    this.wifiScanner.scan((err, towers) => {
      if (err) {
        reject(err);
      } else {
        this.logger.info(`WiFi towers found: ${towers.length}`);
        resolve(
          towers.map(e => {
            return { macAddress: e.mac, signalStrength: e["signal_level"] };
          })
        );
      }
    });
  });
};

module.exports = ({wifiScanner, logger}) => {
  this.wifiScanner = wifiScanner;
  this.logger = logger;

  return getWifiTowers;
};
