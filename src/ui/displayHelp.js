const displayHelp = () => {
    console.log(`🌃 Nightcall automatically switches UI theme based on sunset and sunrise. Available commands:
    "nightcall day" - set day theme
    "nightcall night" - set night theme
    "nightcall location lat lng" - manually set location
    "nightcall location auto - automatically set location on every update`)
}

module.exports = displayHelp;