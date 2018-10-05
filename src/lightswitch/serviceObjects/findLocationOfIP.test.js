const axios = require("axios");
jest.mock("axios");

const logger = require("../util/logger");
jest.mock("../util/logger");

const RESPONSE = { data: { latitude: 53.1, longitude: 13 } };
const LOCATION = { lat: 53.1, lng: 13 };

describe("findLocationOfIP", () => {
  test("returns location of IP", done => {
    const findLocationOfIP = require("./findLocationOfIP")({ logger });
    axios.get.mockResolvedValue(RESPONSE);

    findLocationOfIP("127.0.0.1").then(location => {
      expect(location).toEqual(LOCATION);
      done();
    });
  });
});
