'use strict';

var config   = require('../config')
  , chai     = require('chai')
  , spies    = require('chai-spies')
  , should   = chai.should()
  , mongoose = require('mongoose')
  , clearDB  = require('mocha-mongoose')(config.db)
  , app      = require('../serve');

chai.use(spies);

beforeEach(function(done) {
  if (mongoose.connection.db) return done();

  mongoose.connect(config.db, done);
});
