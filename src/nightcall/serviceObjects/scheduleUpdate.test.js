const logger = require("../util/logger");
jest.mock("../util/logger");

const mockLaunchAgentFileTemplate =
  "Nightcall dir: $NIGHTCALL_DIR, Minutes: $MINUTES, Hours: $HOURS";
const mockState = {
  setAppState: jest.fn()
}
const mockOsProxy = {
  loadLaunchAgent: jest.fn(() => new Promise((resolve, reject) => resolve())),
  getLoadedLaunchAgents: jest.fn(
    () => new Promise((resolve, reject) => resolve([
      {id: 1},
      {id: 2}
    ]))
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
      state: mockState,
      osProxy: mockOsProxy,
      fsProxy: mockFsProxy,
      logger
    };
  });

  test("schedules to update at provided time", done => {
    const now = new Date();
    const expectedResult = `Nightcall dir: ${process.cwd()}, Minutes: ${now.getMinutes() + 1}, Hours: ${now.getHours()}`;
    scheduleUpdate = require("./scheduleUpdate")(params);

    scheduleUpdate(now).then(() => {
      expect(mockOsProxy.removeLaunchAgent).toHaveBeenCalledWith(1);
      expect(mockOsProxy.removeLaunchAgent).toHaveBeenCalledWith(2);
      expect(mockFsProxy.removeLaunchAgentFile).toHaveBeenCalledWith(1);
      expect(mockFsProxy.removeLaunchAgentFile).toHaveBeenCalledWith(2);
      expect(mockFsProxy.readLaunchAgentTemplate).toHaveBeenCalled();
      expect(mockFsProxy.writeLaunchAgentFile).toHaveBeenCalledWith(
        "local.nightcall.base",
        expectedResult
      );
      expect(mockOsProxy.loadLaunchAgent).toHaveBeenCalled();
      done();
    });
  });

  test("propagates read file error", done => {
    const now = new Date();
    const readLaunchAgentTemplate = jest.fn(
      () => new Promise((resolve, reject) => reject())
    );
    scheduleUpdate = require("./scheduleUpdate")({
      ...params,
      fsProxy: {
        ...mockFsProxy,
        readLaunchAgentTemplate
      }
    });

    scheduleUpdate(now).catch(() => {
      expect(readLaunchAgentTemplate).toHaveBeenCalled();
      done();
    });
  });
  
  test("propagates write file error", done => {
    const now = new Date();
    const writeLaunchAgentFile = jest.fn(
      () => new Promise((resolve, reject) => reject())
    );
    scheduleUpdate = require("./scheduleUpdate")({
      ...params,
      fsProxy: {
        ...mockFsProxy,
        writeLaunchAgentFile
      }
    });

    scheduleUpdate(now).catch(() => {
      expect(writeLaunchAgentFile).toHaveBeenCalled();
      done();
    });
  });
  
  test("propagates load launch agent error", done => {
    const now = new Date();
    const loadLaunchAgent = jest.fn(
      () => new Promise((resolve, reject) => reject())
    );
    scheduleUpdate = require("./scheduleUpdate")({
      ...params,
      osProxy: {
        ...mockOsProxy,
        loadLaunchAgent
      }
    });

    scheduleUpdate(now).catch(() => {
      expect(loadLaunchAgent).toHaveBeenCalled();
      done();
    });
  });
});
