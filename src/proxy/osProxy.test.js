const os = require("os");
const sinon = require("sinon");
const childProcess = require("child_process");

const logger = require("../util/logger");
jest.mock("../util/logger");

const osProxy = require("./osProxy")({ logger });

const ERROR = "ERROR";
const MESSAGE = "MESSAGE";

describe("osProxy", () => {
  let stubs = [];

  afterEach(() => {
    stubs.forEach(stub => stub.restore());
    stubs = [];
  });

  test("loads launch agent", done => {
    const exec = sinon.stub(childProcess, "exec").callsArg(2);
    stubs = [exec];

    osProxy.loadLaunchAgent().then(() => {
      done();
    });
  });

  test("handles error while loading launch agent", done => {
    const exec = sinon.stub(childProcess, "exec").callsArgWith(2, ERROR);
    stubs = [exec];

    osProxy.loadLaunchAgent().catch(() => {
      done();
    });
  });

  test("removes launch agent", done => {
    const exec = sinon.stub(childProcess, "exec").callsArgWith(2);
    stubs = [exec];

    osProxy.removeLaunchAgent().then(() => {
      done();
    });
  });

  test("handles error while removing launch agent", done => {
    const exec = sinon.stub(childProcess, "exec").callsArgWith(2, ERROR);
    stubs = [exec];

    osProxy.removeLaunchAgent().catch(() => {
      done();
    });
  });

  test("gets loaded launch agents", done => {
    const exec = sinon
      .stub(childProcess, "exec")
      .callsArgWith(2, null, "- 0 local.nightcall.testBase\n4884 0 local.nightcall.testAux\n");
    stubs = [exec];

    osProxy.getLoadedLaunchAgents().then(result => {
      expect(result).toEqual([
        { id: "local.nightcall.testBase", isRunning: false },
        { pid: "4884", id: "local.nightcall.testAux", isRunning: true }
      ]);
      done();
    });
  });

  test("returns empty agents list when none are loaded", done => {
    const exec = sinon.stub(childProcess, "exec").callsArg(2);
    stubs = [exec];

    osProxy.getLoadedLaunchAgents().then(result => {
      expect(result).toEqual([]);
      done();
    });
  });

  test("sets dark mode", done => {
    const exec = sinon
      .stub(childProcess, "exec")
      .callsFake((command, options, callback) => {
        expect(command).toEqual(
          `osascript -e 'tell application "System Events" to tell appearance preferences to set dark mode to true'`
        );
        callback();
      });
    stubs = [exec];

    osProxy.setOSDarkMode(true).then(() => {
      expect(exec.called).toEqual(true);
      done();
    });
  });

  test("sets light mode", done => {
    const exec = sinon
      .stub(childProcess, "exec")
      .callsFake((command, options, callback) => {
        expect(command).toEqual(
          `osascript -e 'tell application "System Events" to tell appearance preferences to set dark mode to false'`
        );
        callback();
      });
    stubs = [exec];

    osProxy.setOSDarkMode(false).then(() => {
      expect(exec.called).toEqual(true);
      done();
    });
  });

  test("handles error while setting dark mode", done => {
    const exec = sinon
      .stub(childProcess, "exec")
      .callsFake((command, options, callback) => {
        expect(command).toEqual(
          `osascript -e 'tell application "System Events" to tell appearance preferences to set dark mode to true'`
        );
        callback(ERROR, null, ERROR);
      });
    stubs = [exec];

    osProxy.setOSDarkMode(true).catch(() => {
      expect(exec.called).toEqual(true);
      done();
    });
  });
});
