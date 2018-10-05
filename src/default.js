const { getAppState } = require("./lightswitch/state");

getAppState().then(appState => console.log(JSON.stringify(appState)));