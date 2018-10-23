const state = {
  setAppState: jest.fn()
};

const pauseUpdates = require("./pauseUpdates")({ state });

describe("pauseUpdates", () => {
  it("pauses updates", () => {
    pauseUpdates();
    expect(state.setAppState).toHaveBeenCalledWith({ updatesPaused: true });
  });
});
