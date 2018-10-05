const logger = require("../util/logger");
jest.mock("../util/logger");

const mockMacs = ["mac:1", "mac:2"];
const mockSignalLevels = [-12, -90];
const mockErr = "err";
const mockTowersRawData = [
  {
    mac: mockMacs[0],
    signal_level: mockSignalLevels[0]
  },
  {
    mac: mockMacs[1],
    signal_level: mockSignalLevels[1]
  }
];
const mockProcessedTowers = [
  {
    macAddress: mockMacs[0],
    signalStrength: mockSignalLevels[0]
  },
  {
    macAddress: mockMacs[1],
    signalStrength: mockSignalLevels[1]
  }
];
const mockScanner = {
  scan: jest.fn(async callback => {
    callback(null, mockTowersRawData);
  })
};
const mockFailingScanner = {
  scan: jest.fn(async callback => {
    callback(mockErr);
  })
};

describe("getWifiTowers", () => {
  const params = {
    wifiScanner: mockScanner,
    logger
  };

  test("resolves when towers are found", done => {
    const getWifiTowers = require("./getWifiTowers")(params);

    getWifiTowers().then(towers => {
      expect(towers).toEqual(mockProcessedTowers);
      done();
    });
  });

  test("rejects when towers are not found", done => {
    const getWifiTowers = require("./getWifiTowers")({
      ...params,
      wifiScanner: mockFailingScanner
    });

    getWifiTowers().catch(err => {
      expect(err).toEqual(mockErr);
      done();
    });
  });
});
