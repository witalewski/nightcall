const sinon = require("sinon");

const logger = require("../util/logger");
jest.mock("../util/logger");

const { DAY, NIGHT, RETRY_TIMEOUT } = require("../util/constants");

const mockLocation = { lat: 52.405774, lng: 16.929156 };
const mockDaytime = new Date(1539337787432);
const mockBeforeSunrise = new Date(1539312660919);
const mockAfterSunset = new Date(1539370260919);
const mockSunrise = new Date(1539321177064);
const mockSunset = new Date(1539360419052);
const mockSunriseTomorrow = new Date(1539407682004);

const mockStateWithoutLocation = {
  getAppState: jest.fn(() => ({
    location: undefined,
    locationSetManually: false,
    startupAgentCreated: true
  })),
  setAppState: jest.fn()
};
const mockStateWithoutStartupAgent = {
  getAppState: jest.fn(() => ({
    location: undefined,
    locationSetManually: false,
    startupAgentCreated: false
  })),
  setAppState: jest.fn()
};
const mockStateWithManuallyOverriddenLocation = {
  getAppState: jest.fn(() => ({
    location: mockLocation,
    locationSetManually: true,
    startupAgentCreated: true
  })),
  setAppState: jest.fn()
};
const mockStateWithPausedUpdates = {
  getAppState: jest.fn(() => ({
    updatesPaused: true
  })),
  setAppState: jest.fn()
};

const findLocation = jest.fn(async () => mockLocation);
const changeTheme = jest.fn();
const createStartupAgent = jest.fn();

describe("performUpdate", () => {
  let clock, params, performUpdate;

  beforeAll(() => {
    params = {
      createStartupAgent,
      findLocation,
      changeTheme,
      logger
    };
  });

  afterEach(() => {
    clock.restore();
  });

  describe("with new location data", () => {
    test("changes theme to day based on new location data", done => {
      const scheduleUpdate = jest.fn(nextUpdate => {
        expect(changeTheme).toHaveBeenCalledWith(DAY);
        expect(nextUpdate).toEqual(mockSunset);
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
      const scheduleUpdate = jest.fn(nextUpdate => {
        expect(changeTheme).toHaveBeenCalledWith(NIGHT);
        expect(nextUpdate).toEqual(mockSunrise);
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
      const scheduleUpdate = jest.fn(nextUpdate => {
        expect(changeTheme).toHaveBeenCalledWith(NIGHT);
        expect(nextUpdate).toEqual(mockSunriseTomorrow);
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
      const scheduleUpdate = jest.fn(nextUpdate => {
        expect(changeTheme).toHaveBeenCalledWith(DAY);
        expect(nextUpdate).toEqual(mockSunset);
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
      const scheduleUpdate = jest.fn(nextUpdate => {
        expect(changeTheme).toHaveBeenCalledWith(NIGHT);
        expect(nextUpdate).toEqual(mockSunrise);
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
      const scheduleUpdate = jest.fn(nextUpdate => {
        expect(changeTheme).toHaveBeenCalledWith(NIGHT);
        expect(nextUpdate).toEqual(mockSunriseTomorrow);
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

  describe("with no location data", () => {
    test("schedules retry update when no location data is available", done => {
      const scheduleUpdate = jest.fn(nextUpdate => {
        expect(nextUpdate).toEqual(
          new Date(mockDaytime.getTime() + RETRY_TIMEOUT)
        );
        done();
      });
      performUpdate = require("./performUpdate")({
        ...params,
        scheduleUpdate,
        findLocation: jest.fn(async () => {
          throw "err";
        }),
        state: mockStateWithoutLocation
      });
      clock = sinon.useFakeTimers(mockDaytime);
      performUpdate();
    });

    test("creates startup agent", () => {
      const scheduleUpdate = jest.fn();
      performUpdate = require("./performUpdate")({
        ...params,
        scheduleUpdate,
        state: mockStateWithoutStartupAgent
      });
      performUpdate();
      expect(createStartupAgent).toHaveBeenCalled();
    });

    test("aborts if updates are paused", () => {
      const scheduleUpdate = jest.fn();
      performUpdate = require("./performUpdate")({
        ...params,
        scheduleUpdate,
        state: mockStateWithPausedUpdates
      });
      performUpdate();
      expect(scheduleUpdate).not.toHaveBeenCalled();
    });
  });
});
