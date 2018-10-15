const sinon = require("sinon");
const performUpdate = jest.fn();
const setAppState = jest.fn();

const setLocation = require("./setLocation")({
  state: {
    setAppState
  },
  performUpdate
});

describe("setLocation", () => {
  let log, error;
  let stubs;
  beforeEach(() => {});

  afterEach(() => {
    stubs.forEach(stub => stub.restore());
  });

  test("sets location to auto", () => {
    log = sinon.stub(console, "log").callsFake(arg => {
      expect(arg).toEqual("🌃 Nightcall switched to automatic location.");
    });
    stubs = [log];
    setLocation("auto");
    expect(setAppState).toHaveBeenCalledWith({ locationSetManually: false });
  });

  test("sets location to provided coords", () => {
    const lat = "52.4173";
    const lng = "16.9647";
    log = sinon.stub(console, "log").callsFake(arg => {
      expect(arg).toEqual(
        `🌃 Nightcall successfully set location to ${lat},${lng}`
      );
    });
    stubs = [log];
    setLocation(lat, lng);
    expect(setAppState).toHaveBeenCalledWith({
      locationSetManually: true,
      location: {
        lat,
        lng
      }
    });
  });

  test("fails gently when provided badly formatted input", done => {
    error = sinon.stub(console, "error").callsFake(arg => {
      expect(arg).toEqual(
        '🌃 Please try again using "location lat lng" e.g. "location 52.4173 16.9647" or "location auto"'
      );
      done();
    });
    stubs = [error];
    setLocation('52°12" - 16°1"');
  });
});
