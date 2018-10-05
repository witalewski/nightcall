const logger = require("../util/logger")
jest.mock("../util/logger");

const osProxy = require("./osProxy")({ logger });

describe("osProxy", () => {

  test("exposes proper interface", () => {
    expect(typeof osProxy.loadLaunchAgent).toEqual("function");
    expect(typeof osProxy.removeLaunchAgent).toEqual("function");
    expect(typeof osProxy.isLaunchAgentLoaded).toEqual("function");
    expect(typeof osProxy.showDialog).toEqual("function");
    expect(typeof osProxy.setOSDarkMode).toEqual("function");
  });

  test("checks if launch agent is loaded", done => {
    osProxy.isLaunchAgentLoaded().then(result => {
      expect(typeof(result)).toEqual("boolean");
      done();
    });
  });
  
});
