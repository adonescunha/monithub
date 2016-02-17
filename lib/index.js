'use strict';

var Server = require('./server')
  , Promise = require('bluebird').Promise
  , express = require('express')
  , bodyParser = require('body-parser');

module.exports = function() {
  return new Promise(function(resolve) {
    var app = express();

    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/client'));

    return resolve(new Server(app));
  });
};
