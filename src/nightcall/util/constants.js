const RETRY_TIMEOUT = 60 * 60 * 1000;

const NIGHT = "night";
const DAY = "day";

const NIGHTCALL_APP_STATE_KEY = "nightcallAppState";

const BASE_AGENT_ID = "local.nightcall.base";
const AUX_AGENT_ID = "local.nightcall.aux";
const AGENT_REGEX = /local\.nightcall\.\w+/;

const NIGHTCALL_DIR_PLACEHOLDER_REGEX = /\$NIGHTCALL_DIR/g;
const AGENT_ID_PLACEHOLDER_REGEX = /\$AGENT_ID/g;
const MINUTES_PLACEHOLDER_REGEX = /\$MINUTES/g;
const HOURS_PLACEHOLDER_REGEX = /\$HOURS/g;

const INITIAL_APP_STATE = {
  location: undefined,
  sunrise: undefined,
  sunset: undefined,
  locationSetManually: false,
  isNightcallPaused: false,
  theme: "day"
};

module.exports = {
  RETRY_TIMEOUT,
  NIGHT,
  DAY,
  NIGHTCALL_APP_STATE_KEY,
  BASE_AGENT_ID,
  AUX_AGENT_ID,
  AGENT_REGEX,
  NIGHTCALL_DIR_PLACEHOLDER_REGEX,
  AGENT_ID_PLACEHOLDER_REGEX,
  MINUTES_PLACEHOLDER_REGEX,
  HOURS_PLACEHOLDER_REGEX,
  INITIAL_APP_STATE
};
