const pauseUpdates = () => {
  this.state.setAppState({ updatesPaused: true });
};

module.exports = ({ state }) => {
  this.state = state;
  return pauseUpdates;
};