const chalk = require('chalk');
const displayHelp = () => {
    console.log(`\n🌃  Nightcall automatically switches UI theme based on sunset and sunrise.\n\n  Available commands:\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('day')}"\t\t- switch to day theme\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('night')}"\t\t- switch to night theme\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('location')} ${chalk.cyan('LAT LNG')}"\t- manually set location to LAT,LNG - e.g. "${chalk.blue('nightcall')} ${chalk.magenta('location')} ${chalk.cyan('51.1 16.322')}"\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('location')} ${chalk.cyan('auto')}"\t- automatically set location on every update\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('pause')}"\t\t- turn off automatic theme changes\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('resume')}"\t\t- turn on automatic theme changes`);
}

module.exports = displayHelp;