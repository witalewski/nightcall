
# 🌃 Nightcall

[![Build Status](https://travis-ci.com/witalewski/nightcall.svg?branch=master)](https://travis-ci.com/witalewski/nightcall)
[![Coverage Status](https://coveralls.io/repos/github/witalewski/nightcall/badge.svg?branch=master)](https://coveralls.io/github/witalewski/nightcall?branch=master)

Automatically switch between light and dark system themes on sunrise and sunset.

## Getting Started

### Prerequisites

As of today, Nightcall only works with macOS. Standalone installation will make most sense with Mojave (or newer) as this is the first version to have a proper dark OS theme.

### Installing

Just run:

```sh
yarn global add nightcall
```
or:
```sh
npm i -g nightcall
```

Nightcall will be installed globally and automatic setup will follow right after installation.

There is a [Nightcall (VS Code)](https://marketplace.visualstudio.com/items?itemName=witalewski.nightcall-vs-code) extension available to switch between dark and light themes in VS Code in sync with Nightcall.

## Running the tests

To run tests locally, go to the module directory and execute `yarn run jest`

## Built With

* [suncalc](https://www.npmjs.com/package/suncalc) - for calculating sunrise and sunset
* [public-ip](https://www.npmjs.com/package/public-ip) - for obtaining public IP address
* [api.ipstack.com](http://api.ipstack.com/) - for getting location based on public IP address
* [node-wifiscanner](https://www.npmjs.com/package/node-wifiscanner) - for getting data about wifi APs in the surrounding

### Inspired by

* [NightSwitch](https://marketplace.visualstudio.com/items?itemName=gharveymn.nightswitch) - VS Code extension for switching between light and dark theme on sunrise and sunset

The name comes from a Kavinsky song from Drive soundtrack:
[![Kavinsky - Nightcall on Youtube](https://img.youtube.com/vi/MV_3Dpw-BRY/0.jpg)](https://www.youtube.com/watch?v=MV_3Dpw-BRY "Kavinsky - Nightcall (Drive Original Movie Soundtrack) (Official Audio)")
## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONCUCT.md](CODE_OF_CONDUCT.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Kris Witalewski** - *Initial work* - [@witalewski](https://github.com/witalewski/)

See also the list of [contributors](https://github.com/witalewski/nightcall/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details