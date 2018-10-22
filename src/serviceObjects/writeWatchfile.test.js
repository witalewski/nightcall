const os = require("os");
const { DAY, NIGHT } = require("../util/constants");

const writeFile = jest.fn();
const writeWatchfile = require("./writeWatchfile")({ fsProxy: { writeFile } });

describe("writeWatchfile", () => {
  it("writes watch file for day theme", () => {
    writeWatchfile(DAY);
    expect(writeFile).toHaveBeenCalledWith(`${os.homedir()}/.nightcall`, "D");
  });

  it("writes watch file for night theme", () => {
    writeWatchfile(NIGHT);
    expect(writeFile).toHaveBeenCalledWith(`${os.homedir()}/.nightcall`, "N");
  });
});
