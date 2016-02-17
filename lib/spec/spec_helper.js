'use strict';

var config   = require('../server/config')
  , chai     = require('chai')
  , spies    = require('chai-spies')
  , should   = chai.should()
  , mongoose = require('mongoose')
  , clearDB  = require('mocha-mongoose')(config.db)
  , monithub = require('../index');

chai.use(spies);

beforeEach(function(done) {
  if (GLOBAL.app) return done();

  return monithub()
    .then(function(server) {
      GLOBAL.app = server.rootApp;
      server.start();
      done();
    })
    .catch(function(err) {
      throw err;
    });
});
