const os = require("os");
const { NIGHT } = require("../util/constants");

const writeWatchfile = theme => {
  this.writeFile(`${os.homedir()}/.nightcall`, theme === NIGHT ? "N" : "D");
};

module.exports = ({ fsProxy }) => {
  this.writeFile = fsProxy.writeFile;
  return writeWatchfile;
};
