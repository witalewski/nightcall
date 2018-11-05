const logger = require("../util/logger");
jest.mock("../util/logger");

const { BASE_AGENT_ID, AUX_AGENT_ID } = require("../util/constants");

const mockLaunchAgentFileTemplate =
  "Nightcall dir: $NIGHTCALL_DIR, Minutes: $MINUTES, Hours: $HOURS";
const mockState = {
  setAppState: jest.fn()
}
const mockOsProxyBase = {
  loadLaunchAgent: jest.fn(() => new Promise((resolve, reject) => resolve())),
  getLoadedLaunchAgents: jest.fn(
    () => new Promise((resolve, reject) => resolve([
      {id: BASE_AGENT_ID, isRunning: true},
      {id: AUX_AGENT_ID}
    ]))
  ),
  removeLaunchAgent: jest.fn(() => new Promise((resolve, reject) => resolve()))
};
const mockOsProxyAux = {
  loadLaunchAgent: jest.fn(() => new Promise((resolve, reject) => resolve())),
  getLoadedLaunchAgents: jest.fn(
    () => new Promise((resolve, reject) => resolve([
      {id: BASE_AGENT_ID},
      {id: AUX_AGENT_ID, isRunning: true}
    ]))
  ),
  removeLaunchAgent: jest.fn(() => new Promise((resolve, reject) => resolve()))
};
const mockFsProxy = {
  readFile: jest.fn(
    () => new Promise((resolve, reject) => resolve(mockLaunchAgentFileTemplate))
  ),
  writeLaunchAgentFile: jest.fn(
    () => new Promise((resolve, reject) => resolve())
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
      osProxy: mockOsProxyBase,
      fsProxy: mockFsProxy,
      logger
    };
  });

  test("schedules to update at provided time - as base agent", done => {
    const now = new Date();
    const expectedResult = `Nightcall dir: ${process.cwd()}, Minutes: ${now.getMinutes() + 1}, Hours: ${now.getHours()}`;
    scheduleUpdate = require("./scheduleUpdate")(params);

    scheduleUpdate(now).then(() => {
      expect(mockOsProxyBase.removeLaunchAgent).toHaveBeenCalledWith(AUX_AGENT_ID);
      expect(mockFsProxy.removeLaunchAgentFile).toHaveBeenCalledWith(AUX_AGENT_ID);
      expect(mockFsProxy.readFile).toHaveBeenCalled();
      expect(mockFsProxy.writeLaunchAgentFile).toHaveBeenCalledWith(
        "local.nightcall.aux",
        expectedResult
      );
      expect(mockOsProxyBase.loadLaunchAgent).toHaveBeenCalled();
      done();
    });
  });

  test("schedules to update at provided time - as aux agent", done => {
    const now = new Date();
    const expectedResult = `Nightcall dir: ${process.cwd()}, Minutes: ${now.getMinutes() + 1}, Hours: ${now.getHours()}`;
    scheduleUpdate = require("./scheduleUpdate")({
      ...params,
      osProxy: mockOsProxyAux
    });

    scheduleUpdate(now).then(() => {
      expect(mockOsProxyAux.removeLaunchAgent).toHaveBeenCalledWith(BASE_AGENT_ID);
      expect(mockFsProxy.removeLaunchAgentFile).toHaveBeenCalledWith(BASE_AGENT_ID);
      expect(mockFsProxy.readFile).toHaveBeenCalled();
      expect(mockFsProxy.writeLaunchAgentFile).toHaveBeenCalledWith(
        "local.nightcall.base",
        expectedResult
      );
      expect(mockOsProxyAux.loadLaunchAgent).toHaveBeenCalled();
      done();
    });
  });

  test("propagates read file error", done => {
    const now = new Date();
    const readFile = jest.fn(
      () => new Promise((resolve, reject) => reject())
    );
    scheduleUpdate = require("./scheduleUpdate")({
      ...params,
      fsProxy: {
        ...mockFsProxy,
        readFile
      }
    });

    scheduleUpdate(now).catch(() => {
      expect(readFile).toHaveBeenCalled();
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
        ...mockOsProxyBase,
        loadLaunchAgent
      }
    });

    scheduleUpdate(now).catch(() => {
      expect(loadLaunchAgent).toHaveBeenCalled();
      done();
    });
  });
});
