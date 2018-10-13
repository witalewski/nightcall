"use strict";

const getIP = () => {
  this.logger.debug("Checking public IP...");
  return new Promise((resolve, reject) => {
    this.publicIP
      .v4()
      .then(ip => {
        this.logger.debug(`Public IP: ${ip}`);
        resolve(ip);
      })
      .catch(err => reject(err));
  });
};

module.exports = ({publicIP, logger}) => {
  this.publicIP = publicIP;
  this.logger = logger;
  return getIP;
}
