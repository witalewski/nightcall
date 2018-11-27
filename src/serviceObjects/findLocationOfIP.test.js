const findLocationOfIP = require("./findLocationOfIP");
const axios = require("axios");
jest.mock("axios");

const logger = require("../util/logger");
jest.mock("../util/logger");

const RESPONSE = { data: { latitude: 53.1, longitude: 13 } };
const ERROR_RESPONSE = {
  status: 403,
  statusText: "Forbidden"
};
const LOCATION = { lat: 53.1, lng: 13 };

describe("findLocationOfIP", () => {
  test("returns location of IP", done => {
    axios.get.mockResolvedValue(RESPONSE);
    findLocationOfIP("127.0.0.1").then(location => {
      expect(location).toEqual(LOCATION);
      done();
    });
  });
  
  test("handles error while searching for location of IP", done => {
    axios.get.mockResolvedValue(ERROR_RESPONSE);
    findLocationOfIP("127.0.0.1").catch(() => {
      done();
    });
  });
});
