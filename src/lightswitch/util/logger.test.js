const logger = require("./logger");

describe("logger", () => {
    test("exposes all methods in use", () => {
        expect(typeof(logger.error)).toEqual("function");
        expect(typeof(logger.warn)).toEqual("function");
        expect(typeof(logger.info)).toEqual("function");
        expect(typeof(logger.debug)).toEqual("function");
   });
 });