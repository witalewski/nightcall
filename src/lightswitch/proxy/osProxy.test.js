const os = require("os");
const nockExec = require("nock-exec");

const logger = require("../util/logger");
jest.mock("../util/logger");

const osProxy = require("./osProxy")({ logger });

const ERROR = "ERROR";

describe("osProxy", () => {
  test("loads launch agent", done => {
    nockExec(
      `launchctl load ${os.homedir()}/Library/LaunchAgents/tech.witalewski.lightswitch.plist`
    ).reply();

    osProxy.loadLaunchAgent().then(() => {
      done();
    });
  });

  test("handles error while loading launch agent", done => {
    nockExec(
      `launchctl load ${os.homedir()}/Library/LaunchAgents/tech.witalewski.lightswitch.plist`
    ).err(ERROR);

    osProxy.loadLaunchAgent().catch(() => {
      done();
    });
  });

  test("removes launch agent", done => {
    nockExec("launchctl remove tech.witalewski.lightswitch").reply();

    osProxy.removeLaunchAgent().then(() => {
      done();
    });
  });

  test("handles error while removing launch agent", done => {
    nockExec("launchctl remove tech.witalewski.lightswitch").err(ERROR);

    osProxy.removeLaunchAgent().catch(() => {
      done();
    });
  });

  test("checks if launch agent is loaded (when it is)", done => {
    nockExec("launchctl list | grep tech.witalewski.lightswitch").reply(
      0,
      "- 0 tech.witalewski.lightswitch"
    );

    osProxy.isLaunchAgentLoaded().then(result => {
      expect(result).toEqual(true);
      done();
    });
  });

  test("checks if launch agent is loaded (when it is not)", done => {
    nockExec("launchctl list | grep tech.witalewski.lightswitch").reply();

    osProxy.isLaunchAgentLoaded().then(result => {
      expect(result).toEqual(false);
      done();
    });
  });

  test("shows dialog", done => {
    nockExec(
      `osascript -e 'tell app "System Events" to display dialog "MESSAGE" with title "Lightswitch"'`
    ).reply();

    osProxy.showDialog("MESSAGE").then(() => {
      done();
    });
  });

  test("handles error while showing dialog", done => {
    nockExec(
      `osascript -e 'tell app "System Events" to display dialog "MESSAGE" with title "Lightswitch"'`
    )
      .err(ERROR)
      .reply();

    osProxy.showDialog("MESSAGE").catch(() => {
      done();
    });
  });

  test("sets dark mode", done => {
    nockExec(
      `osascript -e 'tell application "System Events" to tell appearance preferences to set dark mode to true'`
    ).reply();

    osProxy.setOSDarkMode(true).then(() => {
      done();
    });
  });

  test("sets light mode", done => {
    nockExec(
      `osascript -e 'tell application "System Events" to tell appearance preferences to set dark mode to false'`
    ).reply();

    osProxy.setOSDarkMode(false).then(() => {
      done();
    });
  });

  test("handles error while setting dark mode", done => {
    nockExec(
      `osascript -e 'tell application "System Events" to tell appearance preferences to set dark mode to true'`
    )
      .err(ERROR)
      .reply();

    osProxy.setOSDarkMode(true).catch(() => {
      done();
    });
  });
});
