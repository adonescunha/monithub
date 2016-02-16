'use strict';

var express = require('express')
  , parentApp = express()
  , monithub = require('./lib');

monithub()
  .then(function(server) {
    parentApp.use('/', server.rootApp);
    server.start(parentApp);
  })
  .catch(function(err) {
    throw err;
  });
