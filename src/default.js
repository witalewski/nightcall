const { getAppState } = require("./nightcall/state");

getAppState().then(appState => console.log(JSON.stringify(appState)));