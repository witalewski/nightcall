"use strict";

const axios = require("axios");
const logger = require("../util/logger");

const findLocationOfWifiTowers = towers => {
  logger.debug("Attempting to find physical location of WiFi towers...");
  logger.info(
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
        logger.debug(`Location found: ${JSON.stringify(location)}`);
        resolve(location);
      })
      .catch(err => reject(err));
  });
};

module.exports = ({ url, apiKey }) => {
  this.url = url;
  this.apiKey = apiKey;
  return findLocationOfWifiTowers;
};
