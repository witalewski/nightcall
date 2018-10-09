const fs = require("fs");
const sinon = require("sinon");

const logger = require("../util/logger");
jest.mock("../util/logger");

const fsProxy = require("./fsProxy")({ logger });

const ERROR = "ERROR";
const OUTPUT = "OUTPUT";

describe("fsProxy", () => {
  let stubs = [];

  afterEach(() => {
    stubs.forEach(stub => stub.restore());
    stubs = [];
  });

  test("reads template file", done => {
    const fsRead = sinon.stub(fs, "readFile").callsArgWith(2, null, OUTPUT);
    stubs = [fsRead];

    fsProxy.readLaunchAgentTemplate().then(contents => {
      expect(fsRead.called).toEqual(true);
      expect(contents).toEqual(OUTPUT);
      done();
    });
  });
  
  test("handles error while reading template file", done => {
    const fsRead = sinon.stub(fs, "readFile").callsArgWith(2, ERROR);
    stubs = [fsRead];

    fsProxy.readLaunchAgentTemplate().catch(error => {
      expect(fsRead.called).toEqual(true);
      expect(error).toEqual(ERROR);
      done();
    });
  });

  test("handles error while reading a file", done => {
    const fsRead = sinon.stub(fs, "readFile").callsArgWith(2, ERROR);
    stubs = [fsRead];

    fsProxy.readLaunchAgentTemplate().catch(err => {
      expect(fsRead.called).toEqual(true);
      expect(err).toEqual(ERROR);
      done();
    });
  });

  test("removes log file", done => {
    const fsAccess = sinon.stub(fs, "access").callsArg(2);
    const fsUnlink = sinon.stub(fs, "unlink").callsArg(1);

    stubs = [fsAccess, fsUnlink];

    fsProxy.removeLogs().then(() => {
      expect(fsAccess.called).toEqual(true);
      expect(fsUnlink.called).toEqual(true);
      done();
    });
  });

  test("handles attempt to remove log file while none present", done => {
    const fsAccess = sinon.stub(fs, "access").callsArgWith(2, ERROR);
    const fsUnlink = sinon.stub(fs, "unlink").callsArg(1);

    stubs = [fsAccess, fsUnlink];

    fsProxy.removeLogs().then(() => {
      expect(fsAccess.called).toEqual(true);
      expect(fsUnlink.called).toEqual(false);
      done();
    });
  });

  test("handles error while removing log file", done => {
    const fsAccess = sinon.stub(fs, "access").callsArg(2);
    const fsUnlink = sinon.stub(fs, "unlink").callsArgWith(1, ERROR);

    stubs = [fsAccess, fsUnlink];

    fsProxy.removeLogs().catch(() => {
      expect(fsAccess.called).toEqual(true);
      expect(fsUnlink.called).toEqual(true);
      done();
    });
  });

  test("removes launch agent file", done => {
    stubs.push(sinon.stub(fs, "access").callsArg(2));
    stubs.push(sinon.stub(fs, "unlink").callsArg(1));

    fsProxy.removeLaunchAgentFile().then(() => {
      stubs.forEach(stub => expect(stub.called).toEqual(true));
      done();
    });
  });

  test("handles attempt to remove launch agent file while none present", done => {
    const fsAccess = sinon.stub(fs, "access").callsArgWith(2, ERROR);
    const fsUnlink = sinon.stub(fs, "unlink").callsArg(1);

    stubs = [fsAccess, fsUnlink];

    fsProxy.removeLaunchAgentFile().then(() => {
      expect(fsAccess.called).toEqual(true);
      expect(fsUnlink.called).toEqual(false);
      done();
    });
  });

  test("handles error while removing launch agent file", done => {
    const fsAccess = sinon.stub(fs, "access").callsArg(2);
    const fsUnlink = sinon.stub(fs, "unlink").callsArgWith(1, ERROR);

    stubs = [fsAccess, fsUnlink];

    fsProxy.removeLaunchAgentFile().catch(() => {
      expect(fsAccess.called).toEqual(true);
      expect(fsUnlink.called).toEqual(true);
      done();
    });
  });
});
