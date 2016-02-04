'use strict';

var config   = require('../config')
  , should   = require('chai').should()
  , mongoose = require('mongoose')
  , clearDB  = require('mocha-mongoose')(config.db)
  , app      = require('../serve');

beforeEach(function(done) {
  if (mongoose.connection.db) return done();

  mongoose.connect(config.db, done);
});
