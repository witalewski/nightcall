const sinon = require("sinon");
const chalk = require('chalk');

const displayHelp = require("./displayHelp");

describe("displayHelp", () => {
  let stub;

  afterEach(() => {
    stub.restore();
  });

  test("displays help", done => {
    stub = sinon.stub(console, "log").callsFake(arg => {
      expect(arg).toEqual(
        `\n🌃 Nightcall automatically switches UI theme based on sunset and sunrise.\n\n  Available commands:\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('day')}" - switch to day theme\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('night')}" - switch to night theme\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('location')} ${chalk.cyan('LAT LNG')}" - manually set location to LAT,LNG - e.g. "${chalk.blue('nightcall')} ${chalk.magenta('location')} ${chalk.cyan('51.1 16.322')}"\n\t· "${chalk.blue('nightcall')} ${chalk.magenta('location')} ${chalk.cyan('auto')}" - automatically set location on every update`
      );
      done();
    });
    displayHelp();
  });
});
