describe("state", () => {
  let state, store, localStorage;

  beforeEach(() => {
    store = {};
    localStorage = {
      getItem: key => store[key],
      setItem: (key, value) => (store[key] = value)
    };

    state = require("./index")(localStorage);
  });

  test("returns initial app state if none defined", () => {
    const appState = state.getAppState();
    expect(appState).toEqual({});
  });

  test("stores and reads app state", () => {
    state.setAppState({ isNightcallPaused: true });
    const appState = state.getAppState();
    expect(appState).toEqual({
      isNightcallPaused: true
    });
  });

  test("sets and reads location data", () => {
    state.setLocationData("foo", { foo: "bar" });
    const locationData = state.getLocationData("foo");
    expect(locationData).toEqual({ foo: "bar" });
  });

  test("returns empty location data when none stored", () => {
    const locationData = state.getLocationData("bar");
    expect(locationData).toEqual(undefined);
  });

  afterAll(() => {
    create.restore();
  });
});
