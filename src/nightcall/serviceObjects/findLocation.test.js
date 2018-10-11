const logger = require("../util/logger");
jest.mock("../util/logger");

const IP = "127.0.0.1";
const TOWERS = ["mac1", "mac2"];
const ERR = "err";
const LOC_1 = { lat: 0, lng: 0 };
const LOC_2 = { lat: 53.3603142, lng: -6.3150542000000005 };

const asyncFail = jest.fn(async () => {
  throw ERR;
});
const getIP = jest.fn(async () => IP);
const getWifiTowers = jest.fn(async () => TOWERS);
const findLocationOfIP = jest.fn(async () => LOC_1);
const findLocationOfWifiTowers = jest.fn(async () => LOC_2);
const emptyState = {
  getLocationData: jest.fn(key => undefined),
  setLocationData: jest.fn((key, value) => undefined)
};
const state = {
  getLocationData: jest.fn(key => LOC_2),
  setLocationData: jest.fn((key, value) => undefined)
};

describe("findLocation", () => {

  const params = {
    getIP,
    getWifiTowers,
    findLocationOfIP,
    findLocationOfWifiTowers,
    state,
    logger
  }

  describe("without cache", () => {
    test("returns wifi location when ip, wifi, ip location and wifi location are available", done => {
      const findLocation = require("./findLocation")({
        ...params,
        state: emptyState,
      });

      findLocation().then(location => {
        expect(location).toEqual(LOC_2);
        done();
      });
    });

    test("returns ip location when ip, wifi and ip location are present but wifi location isn't", done => {
      const findLocation = require("./findLocation")({
        ...params,
        findLocationOfWifiTowers: asyncFail,
        state: emptyState
      });

      findLocation().then(location => {
        expect(location).toEqual(LOC_1);
        done();
      });
    });

    test("fails when ip and wifi are present but location isn't for neither ip or wifi", done => {
      const findLocation = require("./findLocation")({
        ...params,
        findLocationOfIP: asyncFail,
        findLocationOfWifiTowers: asyncFail,
        state: emptyState
      });

      findLocation().catch(err => {
        expect(err).toBeTruthy;
        done();
      });
    });
  });

  describe("with cache", () => {
    test("returns cached location", done => {
      const findLocation = require("./findLocation")(params);

      findLocation().then(location => {
        expect(location).toEqual({ ...LOC_2, foundInCache: true });
        done();
      });
    });
  });
});
