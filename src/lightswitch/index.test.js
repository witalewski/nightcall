const index = require("./index");

describe("lightswitch index", () => {
    test("exposes proper interface", () => {
        expect(typeof(index.performUpdate)).toEqual("function");
        expect(typeof(index.changeTheme)).toEqual("function");
   });
 });
 