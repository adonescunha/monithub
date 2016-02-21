'use strict';

var fs = require('fs')
  , assert = require('assert')
  , ConfigManager = require('../../server/config/config-manager');

describe('ConfigManager', function() {
  var config;

  describe('writeFile', function() {
    beforeEach(function() {
      config = new ConfigManager({});
    });

    it('creates a copy of config.example.js', function(done) {
      var configPath = config._config.paths.config;
      fs.stat(configPath, function(err) {
        var exists = (err) ? false : true;
        assert(exists === false);
        config.writeFile()
          .then(function() {
            fs.stat(configPath, function(err) {
              var exists = (err) ? false : true;
              assert(exists);
              done();
            });
          })
          .catch(function(err) {
            done(err);
          });
      });
    });

    afterEach(function(done) {
      fs.unlink(config._config.paths.config, done);
    });
  });
});
