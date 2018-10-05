const winston = require("winston");

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "lightswitch.log" })
    ]
  });

module.exports = logger;