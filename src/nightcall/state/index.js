"use strict";

const {
  STORAGE_APP_STATE_KEY,
  STORAGE_LOCATION_PREFIX
} = require("../util/constants");

const getLocationData = hash => {
  const storedValue = this.localStorage.getItem(`${STORAGE_LOCATION_PREFIX}${hash}`);
  return storedValue ? JSON.parse(storedValue) : undefined;
};

const setLocationData = (hash, value) => {
  this.localStorage.setItem(
    `${STORAGE_LOCATION_PREFIX}${hash}`,
    JSON.stringify(value)
  );
};

const getAppState = () => {
  const storedValue = this.localStorage.getItem(STORAGE_APP_STATE_KEY);
  return storedValue ? JSON.parse(storedValue) : {};
};

const setAppState = updatedState => {
  const appState = getAppState();
  this.localStorage.setItem(
    STORAGE_APP_STATE_KEY,
    JSON.stringify({
      ...appState,
      ...updatedState
    })
  );
};

module.exports = localStorage => {
  this.localStorage = localStorage;
  return { getLocationData, setLocationData, getAppState, setAppState };
};
