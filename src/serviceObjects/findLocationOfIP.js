"use strict";

const axios = require("axios");

const findLocationOfIP = ip => {
  this.logger.debug("Attempting to find physical location of public IP...");
  return new Promise((resolve, reject) => {
    axios
      .get(`http://api.ipstack.com/${ip}`, {
        params: { access_key: "7d41338ce30f84ba8376cd576e683135" }
      })
      .then(({ data }) => {
        const { latitude, longitude } = data;
        const location = { lat: latitude, lng: longitude };
        this.logger.debug(`Location found: ${JSON.stringify(location)}`);
        resolve(location);
      })
      .catch(err => reject(err));
  });
};

module.exports = ({ logger }) => {
  this.logger = logger;
  return findLocationOfIP;
};
