const logger = require("../util/logger");
jest.mock("../util/logger");

const { STARTUP_AGENT_ID } = require("../util/constants");

const mockLaunchAgentFileTemplate =
  "Nightcall dir: $NIGHTCALL_DIR";
const mockState = {
  setAppState: jest.fn()
};
const mockFsProxy = {
  readLaunchAgentTemplate: jest.fn(
    () => new Promise((resolve, reject) => resolve(mockLaunchAgentFileTemplate))
  ),
  writeLaunchAgentFile: jest.fn(
    () => new Promise((resolve, reject) => resolve())
  )
};

describe("createStartupAgent", () => {
  test("creates startup agent", done => {
    const expectedResult = `Nightcall dir: ${process.cwd()}`;
    const createStartupAgent = require("./createStartupAgent")({
      state: mockState,
      fsProxy: mockFsProxy,
      logger
    });

    createStartupAgent().then(() => {
      expect(mockFsProxy.writeLaunchAgentFile).toHaveBeenCalledWith(
        "local.nightcall.startup",
        expectedResult
      );
      done();
    });
  });
});
