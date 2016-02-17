# MonitHub
[![Build Status](https://travis-ci.org/adonescunha/monithub.svg?branch=master)](https://travis-ci.org/adonescunha/monithub) [![Coverage Status](https://coveralls.io/repos/adonescunha/monithub/badge.svg?branch=master&service=github)](https://coveralls.io/github/adonescunha/monit?branch=master) [![Dependencies Status](https://david-dm.org/adonescunha/monithub.svg)](https://david-dm.org/adonescunha/monit)

MonitHub is a simple dashboard to manage multiple monit instances, built on top of a MEAN stack – MongoDB, Express, AngularJS and Node.js.

## Installation


### Development Installation

Clone

```bash
git clone git://github.com/adonescunha/monithub.git
cd monithub
```

Install gulp

```bash
npm install -g gulp-cli
```

Build

```bash
gulp build
```

Start

```bash
npm start --production
```
### Install MonitHub as an npm module

1. Include MonitHub as a dependency in your `package.json` file:
```json
"dependencies": {
  "monithub": "0.1.0"
}
```

2. Run `npm install` to install MonitHub.

3. Include the MonitHub module where desired and then invoke it to get a promise for a `Server` object:
```javascript
var monithub = require('monithub');
monithub()
  .then(function(server) {
    server.start();
  })
  .catch(function(err) {
    throw err;
  });
```

This interface is mostly inspired by the [Ghost](https://github.com/TryGhost/Ghost/wiki/Using-Ghost-as-an-npm-module) API for using as an npm module.

## Usage

## Suggestions and contribution

Any feedback, suggestions or patches are welcome via [e-mail](mailto:adonescunha@gmail.com) or Github Issues/Pull Requests. However, when submitting a patch, test are required to ensure bugs are not introduced.

### Testing

Client:

```bash
karma start --single-run
```

Server:

```bash
npm test
```

## MIT Licensed

See the [LICENSE file](LICENSE) for details.

-----
[Adones Cunha](http://github.com/adonescunha)
