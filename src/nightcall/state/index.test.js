const nodePersist = require("node-persist");
const state = require("./index");
const sinon = require("sinon");

describe("state", () => {
  let mockStore;
  let create = sinon.stub(nodePersist, "create").callsFake(({ dir }) => {
    mockStore = {};
  });
  let getItem = sinon.stub(nodePersist, "getItem").callsFake(async key => mockStore[key]);
  let setItem = sinon.stub(nodePersist, "setItem").callsFake(async (key, value) => mockStore[key] = value);

  beforeAll(() => {});

  test("no errors while executing", () => {
    state.getItem("foo");
    state.getAppState();
  });

  test("reads and updates app state", () => {
    let appState = state.getAppState();
    state.setAppState({isNightcallPaused: true})
  });

  afterAll(() => {
    create.restore();
  });
});
