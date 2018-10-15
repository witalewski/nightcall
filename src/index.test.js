const index = require("./index");

describe("nightcall index", () => {
    test("exposes proper interface", () => {
        expect(typeof(index.performUpdate)).toEqual("function");
        expect(typeof(index.changeTheme)).toEqual("function");
        expect(typeof(index.removeAllAgentsAndFiles)).toEqual("function");
        expect(typeof(index.setLocation)).toEqual("function");
   });
 });
 