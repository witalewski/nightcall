"use strict";

const getIP = () => {
  this.logger.info("Checking public IP...");
  return new Promise((resolve, reject) => {
    this.publicIP
      .v4()
      .then(ip => {
        this.logger.info(`Public IP: ${ip}`);
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
