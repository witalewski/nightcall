let fs = require("fs");
const logger = require("../util/logger")
jest.mock("../util/logger");

const fsProxy = require("./fsProxy")({ logger });

describe("fsProxy", () => {
  const originalFs = {};

  beforeAll(() => {
    fs.readFile = jest.fn((path, encoding, callback) => {
      callback(null, "output");
    });
    fs.access = jest.fn((path, constants, callback) => callback(null));
    fs.unlink = jest.fn((path, callback) => callback());
  });

  test("exposes proper interface", () => {
    expect(typeof fsProxy.readLaunchAgentTemplate).toEqual("function");
    expect(typeof fsProxy.writeLaunchAgentFile).toEqual("function");
    expect(typeof fsProxy.removeLogs).toEqual("function");
    expect(typeof fsProxy.removeCache).toEqual("function");
    expect(typeof fsProxy.removeLaunchAgentFile).toEqual("function");
  });

  test("reads a file", done => {
    fsProxy.readLaunchAgentTemplate().then(contents => {
      expect(contents).toEqual("output");
      done();
    });
  });

  test("removes log file", done => {
    fsProxy.removeLogs().then(() => {
      expect(fs.access).toHaveBeenCalled();
      expect(fs.unlink).toHaveBeenCalled();
      done();
    });
  });
  
  test("removes launch agent file", done => {
    fsProxy.removeLaunchAgentFile().then(() => {
      expect(fs.access).toHaveBeenCalled();
      expect(fs.unlink).toHaveBeenCalled();
      done();
    });
  });

  afterAll(() => {
    fs.readFile = originalFs.readFile;
  });
});
