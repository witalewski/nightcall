const logger = require("../util/logger");
jest.mock("../util/logger");

const mockIP = "127.0.0.1";
const mockErr = "err";

describe("getIP", () => {
  test("resolves when IP is found", done => {
    const getIP = require("./getIP")({
      publicIP: {
        v4: jest.fn(async () => mockIP)
      },
      logger
    });

    getIP().then(ip => {
      expect(ip).toEqual(mockIP);
      done();
    });
  });

  test("rejects when IP is not", done => {
    const getIP = require("./getIP")({
      publicIP: {
        v4: jest.fn(async () => {
          throw mockErr;
        })
      },
      logger
    });

    getIP().catch(err => {
      expect(err).toEqual(mockErr);
      done();
    });
  });
});
