const getIP = require("./getIP");

const logger = require("../util/logger");
const publicIP = require("public-ip");
const sinon = require("sinon");

jest.mock("../util/logger");

const mockIP = "127.0.0.1";
const mockErr = "err";

describe("getIP", () => {
  let stubs = [];

  afterEach(() => {
    stubs.forEach(stub => stub.restore());
    stubs = [];
  });

  test("resolves when IP is found", done => {
    const v4 = sinon.stub(publicIP, "v4").callsFake(async () => mockIP);
    stubs = [v4];

    getIP().then(ip => {
      expect(ip).toEqual(mockIP);
      done();
    });
  });

  test("rejects when IP is not", done => {
    const v4 = sinon.stub(publicIP, "v4").callsFake(async () => {
      throw mockErr;
    });
    stubs = [v4];

    getIP().catch(err => {
      expect(err).toEqual(mockErr);
      done();
    });
  });
});
