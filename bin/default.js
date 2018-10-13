const { getAppState } = require("../src/nightcall/state");

getAppState().then(appState => console.log(JSON.stringify(appState)));