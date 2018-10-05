"use strict";

const axios = require("axios");

const findLocationOfWifiTowers = towers => {
  this.logger.info("Attempting to find physical location of WiFi towers...");
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://qw6c0mxwz9.execute-api.eu-west-1.amazonaws.com/default/lightswitch",
        JSON.stringify({
          wifiAccessPoints: towers
        }),
        {
          headers: {
            "x-api-key": "S0a5WCywb68N075YgoTVK3TidPB11bus2vplyW9s"
          }
        }
      )
      .then(({ data }) => {
        let {
          location: { lat, lng }
        } = data;
        const location = { lat, lng };
        this.logger.info(`Location found: ${JSON.stringify(location)}`);
        resolve(location);
      })
      .catch(err => reject(err));
  });
};

module.exports = ({ logger }) => {
  this.logger = logger;
  return findLocationOfWifiTowers;
};
