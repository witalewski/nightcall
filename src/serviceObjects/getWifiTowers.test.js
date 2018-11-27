const getWifiTowers = require("./getWifiTowers");

const logger = require("../util/logger");
const sinon = require("sinon");
const wifiScanner = require("node-wifiscanner");
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

describe("getWifiTowers", () => {

  let stubs = [];

  afterEach(() => {
    stubs.forEach(stub => stub.restore());
    stubs = [];
  });
  
  test("resolves when towers are found", done => {
    const scan = sinon.stub(wifiScanner, "scan").callsFake(async callback => callback(null, mockTowersRawData));
    stubs = [scan];

    getWifiTowers().then(towers => {
      expect(towers).toEqual(mockProcessedTowers);
      done();
    });
  });

  test("rejects when towers are not found", done => {
    const scan = sinon.stub(wifiScanner, "scan").callsFake(async callback => callback(mockErr));
    stubs = [scan];

    getWifiTowers().catch(err => {
      expect(err).toEqual(mockErr);
      done();
    });
  });
});
