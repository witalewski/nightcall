"use strict";

const nodePersist = require("node-persist");
const {
  INITIAL_APP_STATE,
  NIGHTCALL_APP_STATE_KEY
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
  const appState = await cache.getItem(NIGHTCALL_APP_STATE_KEY);
  return new Promise(resolve =>
    resolve(appState !== undefined ? JSON.parse(appState) : INITIAL_APP_STATE)
  );
};

const setAppState = async updatedState => {
  await initializeCacheIfEmpty();
  const appState = await getAppState();
  await cache.removeItem(NIGHTCALL_APP_STATE_KEY);
  return cache.setItem(
    NIGHTCALL_APP_STATE_KEY,
    JSON.stringify({
      ...appState,
      ...updatedState
    })
  );
};

module.exports = { getItem, setItem, getAppState, setAppState };
