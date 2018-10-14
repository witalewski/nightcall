const logger = require("../util/logger");
jest.mock("../util/logger");

const { BASE_AGENT_ID, AUX_AGENT_ID } = require("../util/constants");

const mockOsProxy = {
  getLoadedLaunchAgents: jest.fn(
    () =>
      new Promise((resolve, reject) =>
        resolve([{ id: BASE_AGENT_ID }, { id: AUX_AGENT_ID }])
      )
  ),
  removeLaunchAgent: jest.fn(() => new Promise((resolve, reject) => resolve()))
};

const mockFsProxy = {
  removeLaunchAgentFile: jest.fn(
    () => new Promise((resolve, reject) => resolve())
  ),
  removeLogs: jest.fn(() => new Promise((resolve, reject) => resolve())),
  removeCache: jest.fn(() => new Promise((resolve, reject) => resolve()))
};

describe("remove all agents and files", () => {
  test("removes all agents and files", done => {
    const removeAllAgentsAndFiles = require("./removeAllAgentsAndFiles")({
      logger,
      osProxy: mockOsProxy,
      fsProxy: mockFsProxy,
    });

    removeAllAgentsAndFiles().then(() => {
      expect(mockOsProxy.removeLaunchAgent).toHaveBeenCalledWith(BASE_AGENT_ID);
      expect(mockOsProxy.removeLaunchAgent).toHaveBeenCalledWith(AUX_AGENT_ID);
      expect(mockFsProxy.removeLaunchAgentFile).toHaveBeenCalledWith(
        BASE_AGENT_ID
      );
      expect(mockFsProxy.removeLaunchAgentFile).toHaveBeenCalledWith(
        AUX_AGENT_ID
      );
      expect(mockFsProxy.removeLogs).toHaveBeenCalled();
      expect(mockFsProxy.removeCache).toHaveBeenCalled();
      done();
    });
  });
});
