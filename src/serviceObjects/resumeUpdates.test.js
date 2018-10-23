const state = {
  setAppState: jest.fn()
};

const resumeUpdates = require("./resumeUpdates")({ state });

describe("resumeUpdates", () => {
  it("resumes updates", () => {
    resumeUpdates();
    expect(state.setAppState).toHaveBeenCalledWith({ updatesPaused: false });
  });
});
