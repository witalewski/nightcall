const chalk = require('chalk');
const displayHelp = () => {
    console.log(`\n🌃 Nightcall automatically switches UI theme based on sunset and sunrise.\n\n  Available commands:\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('day')}" - switch to day theme\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('night')}" - switch to night theme\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('location')} ${chalk.cyan('LAT LNG')}" - manually set location to LAT,LNG - e.g. "${chalk.blue('nightcall')} ${chalk.magenta('location')} ${chalk.cyan('51.1 16.322')}"\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('location')} ${chalk.cyan('auto')}" - automatically set location on every update`);
}

module.exports = displayHelp;