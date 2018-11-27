"use strict";
const logger = require("../util/logger");
const publicIP = require("public-ip");

const getIP = () => {
  logger.debug("Checking public IP...");
  return new Promise((resolve, reject) => {
    publicIP
      .v4()
      .then(ip => {
        logger.debug(`Public IP: ${ip}`);
        resolve(ip);
      })
      .catch(err => reject(err));
  });
};

module.exports = getIP;