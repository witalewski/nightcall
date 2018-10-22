const { DAY, NIGHT } = require("../util/constants");

const logger = require("../util/logger");
jest.mock("../util/logger");

const state = {
  setAppState: jest.fn(async () => {})
};
const osProxy = {
  setOSDarkMode: jest.fn(value => value),
  showDialog: jest.fn(() => {})
};
const writeWatchfile = jest.fn();

describe("changeTheme", () => {
  const params = {
    osProxy,
    state,
    writeWatchfile,
    logger
  };

  test("properly sets day theme", () => {
    const changeTheme = require("./changeTheme")(params);

    changeTheme(DAY);
    expect(osProxy.setOSDarkMode).toBeCalledWith(false);
    expect(writeWatchfile).toBeCalledWith(DAY);
  });

  test("properly sets night theme", () => {
    const changeTheme = require("./changeTheme")(params);

    changeTheme(NIGHT);
    expect(osProxy.setOSDarkMode).toBeCalledWith(true);
    expect(writeWatchfile).toBeCalledWith(NIGHT);
  });
});
