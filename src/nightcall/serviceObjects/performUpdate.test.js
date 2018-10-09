const sinon = require("sinon");

const logger = require("../util/logger");
jest.mock("../util/logger");

const { DAY, NIGHT } = require("../util/constants");

const mockLocation = { lat: 53.3603142, lng: -6.3150542000000005 };
const mockDaytime = new Date(1538905712356);
const mockBeforeSunrise = new Date(1538885521289);
const mockAfterSunset = new Date(1538943182631);
const mockSunset = new Date(1538934620641);
const mockSunrise = new Date(1538894296248);

const mockStateWithoutLocation = {
  getAppState: jest.fn(async () => ({
    location: undefined,
    locationSetManually: false
  })),
  setAppState: jest.fn()
};
const mockStateWithManuallyOverriddenLocation = {
  getAppState: jest.fn(async () => ({
    location: mockLocation,
    locationSetManually: true
  })),
  setAppState: jest.fn()
};
const findLocation = jest.fn(async () => mockLocation);
const changeTheme = jest.fn();
const osProxy = {
  showDialog: jest.fn()
};

describe("performUpdate", () => {
  let clock, params, performUpdate;

  beforeAll(() => {
    params = {
      findLocation,
      changeTheme,
      osProxy,
      logger
    };
  });

  afterEach(() => {
    clock.restore();
  });

  describe("with new location data", () => {
    test("changes theme to day based on new location data", done => {
      const scheduleUpdate = jest.fn(theme => {
        expect(changeTheme).toHaveBeenCalledWith(DAY);
        expect(theme).toEqual(mockSunset);
        done();
      });
      performUpdate = require("./performUpdate")({
        ...params,
        scheduleUpdate,
        state: mockStateWithoutLocation
      });
      clock = sinon.useFakeTimers(mockDaytime);
      performUpdate();
    });

    test("changes theme to night based on new location data before sunrise", done => {
      const scheduleUpdate = jest.fn(theme => {
        expect(changeTheme).toHaveBeenCalledWith(NIGHT);
        expect(theme).toEqual(mockSunrise);
        done();
      });
      performUpdate = require("./performUpdate")({
        ...params,
        scheduleUpdate,
        state: mockStateWithoutLocation
      });
      clock = sinon.useFakeTimers(mockBeforeSunrise);
      performUpdate();
    });

    test("changes theme to night based on new location data after sunset", done => {
      const scheduleUpdate = jest.fn(theme => {
        expect(changeTheme).toHaveBeenCalledWith(NIGHT);
        expect(theme).toEqual(mockSunrise);
        done();
      });
      performUpdate = require("./performUpdate")({
        ...params,
        scheduleUpdate,
        state: mockStateWithoutLocation
      });
      clock = sinon.useFakeTimers(mockAfterSunset);
      performUpdate();
    });
  });

  describe("with manually overriden location data", () => {
    test("changes theme to day based on new location data", done => {
      const scheduleUpdate = jest.fn(theme => {
        expect(changeTheme).toHaveBeenCalledWith(DAY);
        expect(theme).toEqual(mockSunset);
        done();
      });
      performUpdate = require("./performUpdate")({
        ...params,
        scheduleUpdate,
        state: mockStateWithManuallyOverriddenLocation
      });

      clock = sinon.useFakeTimers(mockDaytime);
      performUpdate();
    });

    test("changes theme to night based on new location data before sunrise", done => {
      const scheduleUpdate = jest.fn(theme => {
        expect(changeTheme).toHaveBeenCalledWith(NIGHT);
        expect(theme).toEqual(mockSunrise);
        done();
      });
      performUpdate = require("./performUpdate")({
        ...params,
        scheduleUpdate,
        state: mockStateWithManuallyOverriddenLocation
      });

      clock = sinon.useFakeTimers(mockBeforeSunrise);
      performUpdate();
    });

    test("changes theme to night based on new location data after sunset", done => {
      const scheduleUpdate = jest.fn(theme => {
        expect(changeTheme).toHaveBeenCalledWith(NIGHT);
        expect(theme).toEqual(mockSunrise);
        done();
      });
      performUpdate = require("./performUpdate")({
        ...params,
        scheduleUpdate,
        state: mockStateWithManuallyOverriddenLocation
      });

      clock = sinon.useFakeTimers(mockAfterSunset);
      performUpdate();
    });
  });
});
