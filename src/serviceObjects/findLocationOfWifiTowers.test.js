const axios = require("axios");
jest.mock("axios");

const logger = require("../util/logger");
jest.mock("../util/logger");

const RESPONSE = { data: { location: { lat: 53.1, lng: 13 } } };
const ERROR_RESPONSE = {
  status: 403,
  statusText: "Forbidden"
};
const LOCATION = { lat: 53.1, lng: 13 };

describe("findLocationOfWifiTowers", () => {
  test("returns location of Wifi towers", done => {
    const findLocationOfWifiTowers = require("./findLocationOfWifiTowers")({
      url: "http://whatever.com",
      apiKey: ""
    });
    axios.post.mockResolvedValue(RESPONSE);

    findLocationOfWifiTowers("127.0.0.1").then(location => {
      expect(location).toEqual(LOCATION);
      done();
    });
  });

  test("handles error while searching for location of Wifi towers", done => {
    const findLocationOfWifiTowers = require("./findLocationOfWifiTowers")({
      url: "http://whatever.com",
      apiKey: ""
    });
    axios.post.mockResolvedValue(ERROR_RESPONSE);

    findLocationOfWifiTowers("127.0.0.1").catch(() => {
      done();
    });
  });
});
