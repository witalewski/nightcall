"use strict";

const axios = require("axios");

const findLocationOfWifiTowers = towers => {
  this.logger.debug("Attempting to find physical location of WiFi towers...");
  this.logger.info(
    JSON.stringify({
      wifiAccessPoints: towers
    })
  );
  return new Promise((resolve, reject) => {
    axios
      .post(
        this.url,
        JSON.stringify({
          wifiAccessPoints: towers
        }),
        {
          headers: {
            "x-api-key": this.apiKey,
            "Content-Type": "application/json"
          }
        }
      )
      .then(({ data }) => {
        let {
          location: { lat, lng }
        } = data;
        const location = { lat, lng };
        this.logger.debug(`Location found: ${JSON.stringify(location)}`);
        resolve(location);
      })
      .catch(err => reject(err));
  });
};

module.exports = ({ logger }) => ({ url, apiKey }) => {
  (this.url = url), (this.apiKey = apiKey);
  this.logger = logger;
  return findLocationOfWifiTowers;
};
