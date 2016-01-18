var dbURI    = 'mongodb://localhost/monithub_test';
var should   = require('chai').should();
var mongoose = require('mongoose');
var clearDB  = require('mocha-mongoose')(dbURI);

beforeEach(function(done) {
  if (mongoose.connection.db) return done();

  mongoose.connect(dbURI, done);
});
