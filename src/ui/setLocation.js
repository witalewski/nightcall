const { AUTO } = require("../util/constants");

const setLocation = (...args) => {
  if (args.length && args[0] === "auto") {
    this.state.setAppState({ locationSetManually: false });
    console.log("🌃 Nightcall switched to automatic location.");
    this.performUpdate();
  } else if (
    args.length &&
    args.every(e => {
      const match = e.match(/^\d+(\.\d+)?$/);
      return match && e === match[0];
    })
  ) {
    const [lat, lng] = args;
    this.state.setAppState({
      locationSetManually: true,
      location: {
        lat,
        lng
      }
    });
    console.log(`🌃 Nightcall successfully set location to ${lat},${lng}`);
  } else {
    console.error(
      '🌃 Please try again using "location lat lng" e.g. "location 52.4173 16.9647" or "location auto"'
    );
  }
};

module.exports = ({ state, performUpdate }) => {
  this.state = state;
  this.performUpdate = performUpdate;
  return setLocation;
};
