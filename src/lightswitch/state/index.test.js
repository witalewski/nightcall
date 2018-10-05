const nodePersist = require("node-persist");
const state = require("./index");

describe("state", () => {
    test("no errors while executing", () => {
        state.getItem("foo");
        state.getAppState();
   });
 });