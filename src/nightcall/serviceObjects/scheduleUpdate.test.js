const logger = require("../util/logger");
jest.mock("../util/logger");

const mockLaunchAgentFileTemplate =
  "Nightcall dir: $NIGHTCALL_DIR, Minutes: $MINUTES, Hours: $HOURS";
const mockOsProxy = {
  loadLaunchAgent: jest.fn(() => new Promise((resolve, reject) => resolve())),
  getLoadedLaunchAgents: jest.fn(
    () => new Promise((resolve, reject) => resolve([]))
  ),
  removeLaunchAgent: jest.fn(() => new Promise((resolve, reject) => resolve()))
};
const mockFsProxy = {
  readLaunchAgentTemplate: jest.fn(
    () => new Promise((resolve, reject) => resolve(mockLaunchAgentFileTemplate))
  ),
  writeLaunchAgentFile: jest.fn(
    contents => new Promise((resolve, reject) => resolve())
  ),
  removeLaunchAgentFile: jest.fn(
    () => new Promise((resolve, reject) => resolve())
  )
};


describe("scheduleUpdate", () => {
  let params, scheduleUpdate;

  beforeAll(() => {
    params = {
      osProxy: mockOsProxy,
      fsProxy: mockFsProxy,
      logger
    };
  });

  test("schedules to update at provided time", done => {
    const now = new Date();
    const expectedResult = `Nightcall dir: ${process.cwd()}, Minutes: ${now.getMinutes()}, Hours: ${now.getHours()}`;
    scheduleUpdate = require("./scheduleUpdate")(params);

    scheduleUpdate(now).then(() => {
      expect(mockFsProxy.writeLaunchAgentFile).toHaveBeenCalledWith(
        "local.nightcall.base",
        expectedResult
      );
      expect(mockOsProxy.loadLaunchAgent).toHaveBeenCalled();
      done();
    });
  });
});
