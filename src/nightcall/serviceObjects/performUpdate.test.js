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
  getAppState: jest.fn().mockReturnValue({
    location: undefined,
    locationSetManually: false
  }),
  setAppState: jest.fn()
};
const mockStateWithManuallyOverriddenLocation = {
  getAppState: jest.fn().mockReturnValue({
    location: mockLocation,
    locationSetManually: true
  }),
  setAppState: jest.fn()
};
const mockFindLocation = jest.fn().mockReturnValue(mockLocation);
const mockChangeTheme = jest.fn();
const mockScheduleUpdate = jest.fn();
const mockOsProxy = {
  showDialog: jest.fn()
};

describe("performUpdate", () => {
  let clock, params, performUpdate;

  beforeAll(() => {
    params = {
      state: mockStateWithoutLocation,
      findLocation: mockFindLocation,
      changeTheme: mockChangeTheme,
      scheduleUpdate: mockScheduleUpdate,
      osProxy: mockOsProxy,
      logger
    };
  });

  describe("with new location data", () => {
    beforeEach(() => {
      performUpdate = require("./performUpdate")(params);
    });

    test("changes theme to day based on new location data", done => {
      clock = sinon.useFakeTimers(mockDaytime);
      performUpdate().then(() => {
        expect(mockChangeTheme).toHaveBeenCalledWith(DAY);
        expect(mockScheduleUpdate).toHaveBeenCalledWith(mockSunset);
        done();
      });
    });

    test("changes theme to night based on new location data before sunrise", done => {
      clock = sinon.useFakeTimers(mockBeforeSunrise);
      performUpdate().then(() => {
        expect(mockChangeTheme).toHaveBeenCalledWith(NIGHT);
        expect(mockScheduleUpdate).toHaveBeenCalledWith(mockSunrise);
        done();
      });
    });

    test("changes theme to night based on new location data after sunset", done => {
      clock = sinon.useFakeTimers(mockAfterSunset);
      performUpdate().then(() => {
        expect(mockChangeTheme).toHaveBeenCalledWith(NIGHT);
        expect(mockScheduleUpdate).toHaveBeenCalledWith(mockSunrise);
        done();
      });
    });
  });

  describe("with manually overriden location data", () => {
    beforeEach(() => {
      performUpdate = require("./performUpdate")({
        ...params,
        state: mockStateWithManuallyOverriddenLocation
      });
    });

    test("changes theme to day based on new location data", done => {
      clock = sinon.useFakeTimers(mockDaytime);
      performUpdate().then(() => {
        expect(mockChangeTheme).toHaveBeenCalledWith(DAY);
        expect(mockScheduleUpdate).toHaveBeenCalledWith(mockSunset);
        done();
      });
    });

    test("changes theme to night based on new location data before sunrise", done => {
      clock = sinon.useFakeTimers(mockBeforeSunrise);
      performUpdate().then(() => {
        expect(mockChangeTheme).toHaveBeenCalledWith(NIGHT);
        expect(mockScheduleUpdate).toHaveBeenCalledWith(mockSunrise);
        done();
      });
    });

    test("changes theme to night based on new location data after sunset", done => {
      clock = sinon.useFakeTimers(mockAfterSunset);
      performUpdate().then(() => {
        expect(mockChangeTheme).toHaveBeenCalledWith(NIGHT);
        expect(mockScheduleUpdate).toHaveBeenCalledWith(mockSunrise);
        done();
      });
    });
  });

  afterEach(() => {
    clock.restore();
  });
});
