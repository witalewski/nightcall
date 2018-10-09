const RETRY_TIMEOUT = 60 * 60 * 1000;

const NIGHT = "night";
const DAY = "day";

const LIGHTSWITCH_APP_STATE_KEY = "lightswitchAppState";

const BASE_AGENT_ID = "local.lightswitch.base";
const AUX_AGENT_ID = "local.lightswitch.aux";
const AGENT_REGEX = /local\.lightswitch\.\w+/;

const LIGHTSWITCH_DIR_PLACEHOLDER_REGEX = /\$LIGHTSWITCH_DIR/g;
const AGENT_ID_PLACEHOLDER_REGEX = /\$AGENT_ID/g;
const MINUTES_PLACEHOLDER_REGEX = /\$MINUTES/g;
const HOURS_PLACEHOLDER_REGEX = /\$HOURS/g;

const INITIAL_APP_STATE = {
  location: undefined,
  sunrise: undefined,
  sunset: undefined,
  locationSetManually: false,
  isLightswitchPaused: false,
  theme: "day"
};

module.exports = {
  RETRY_TIMEOUT,
  NIGHT,
  DAY,
  LIGHTSWITCH_APP_STATE_KEY,
  BASE_AGENT_ID,
  AUX_AGENT_ID,
  AGENT_REGEX,
  LIGHTSWITCH_DIR_PLACEHOLDER_REGEX,
  AGENT_ID_PLACEHOLDER_REGEX,
  MINUTES_PLACEHOLDER_REGEX,
  HOURS_PLACEHOLDER_REGEX,
  INITIAL_APP_STATE
};
