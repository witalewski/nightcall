"use strict";

const nodePersist = require("node-persist");
const {
  INITIAL_APP_STATE,
  LIGHTSWITCH_APP_STATE_KEY
} = require("../util/constants");

const cache = nodePersist.create({ dir: "cache" });
let cacheInitialized = false;

const initializeCacheIfEmpty = async () => {
  if (!cacheInitialized) {
    await cache.init();
    cacheInitialized = true;
  }
};

const getItem = async (...args) => {
  await initializeCacheIfEmpty();
  return cache.getItem(...args);
};

const setItem = async (...args) => {
  await initializeCacheIfEmpty();
  return cache.setItem(...args);
};

const getAppState = async () => {
  await initializeCacheIfEmpty();
  const appState = await cache.getItem(LIGHTSWITCH_APP_STATE_KEY);
  if (appState) {
    return appState;
  }
  return INITIAL_APP_STATE;
};

const setAppState = async updatedState => {
  await initializeCacheIfEmpty();
  const appState = await cache.getItem(LIGHTSWITCH_APP_STATE_KEY);
  cache.removeItem(LIGHTSWITCH_APP_STATE_KEY);
  return cache.setItem(LIGHTSWITCH_APP_STATE_KEY, {
    ...appState,
    ...updatedState
  });
};

module.exports = { getItem, setItem, getAppState, setAppState };
