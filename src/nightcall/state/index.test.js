const nodePersist = require("node-persist");
const sinon = require("sinon");

const { INITIAL_APP_STATE } = require("../util/constants");

describe("state", () => {
  let create, state;

  beforeAll(() => {
    create = sinon.stub(nodePersist, "create").callsFake(({ dir }) => {
      return {
        init: async () => {
          this.mockStore = {};
        },
        setItem: async (key, value) => new Promise(resolve => resolve(this.mockStore[key] = value)),
        getItem: async key => new Promise(resolve => resolve(this.mockStore[key])),
        removeItem: async key => new Promise(resolve => resolve(this.mockStore[key] = undefined))
      };
    });

    state = require("./index");
  });

  test("returns initial app state if none defined", done => {
    state.getAppState().then(appState => {
      expect(appState).toEqual(INITIAL_APP_STATE);
      done();
    });
  });

  test("stores and reads app state", done => {
    state.setAppState({ isNightcallPaused: true }).then(() => {
      state.getAppState().then(appState => {
        expect(appState).toEqual({
          ...INITIAL_APP_STATE,
          isNightcallPaused: true
        });
        done();
      });
    });
  });

  test("sets and reads arbitrary item", done => {
    state.setItem("foo","bar").then(() => {
      state.getItem("foo").then(foo => {
        expect(foo).toEqual("bar");
        done();
      })
    })
  });


  afterAll(() => {
    create.restore();
  });
});
