const axios = require("axios");
jest.mock("axios");

const logger = require("../util/logger");
jest.mock("../util/logger");

const RESPONSE = { data: { location: { lat: 53.1, lng: 13 } } };
const LOCATION = { lat: 53.1, lng: 13 };

describe("findLocationOfWifiTowers", () => {
  test("returns location of Wifi towers", done => {
    const findLocationOfWifiTowers = require("./findLocationOfWifiTowers")({
      logger
    });
    axios.post.mockResolvedValue(RESPONSE);

    findLocationOfWifiTowers("127.0.0.1").then(location => {
      expect(location).toEqual(LOCATION);
      done();
    });
  });
});
