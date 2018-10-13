const sinon = require("sinon");
const logger = require("./logger");

const MSG = "Unit tests running - testing logger";

describe("logger", () => {
  let stub;

  beforeAll(() => {
    stub = sinon.stub(console._stdout, "write");
  });

  test("exposes all methods in use", () => {
    expect(typeof logger.error).toEqual("function");
    expect(typeof logger.warn).toEqual("function");
    expect(typeof logger.debug).toEqual("function");
    expect(typeof logger.debug).toEqual("function");
  });

  test("prints message with appropriate format", () => {
    logger.debug(MSG);
    expect(stub.called).toEqual(true);
  });

  afterAll(() => {
      stub.restore();
  })
});
