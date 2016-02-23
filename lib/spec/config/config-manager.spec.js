'use strict';

var fs = require('fs')
  , path = require('path')
  , assert = require('assert')
  , ConfigManager = require('../../server/config/config-manager');

describe('ConfigManager', function() {
  var config
    , configPath;

  beforeEach(function() {
    config = new ConfigManager({});
    configPath = path.join(__dirname, 'config.js');
  });

  describe('writeFile', function() {
    it('creates a copy of config.example.js', function(done) {
      config._config.paths.config = configPath;
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

  describe('load', function() {
    var testConfig;

    describe('when configPath exists', function() {
      beforeEach(function() {
        configPath = path.join(__dirname, 'config-test.js');
        testConfig = require(configPath)[process.env.NODE_ENV];
      });

      it('loads configuration to _config', function(done) {
        config.load(configPath)
          .then(function() {
            config._config.db.should.be.equal(testConfig.db);
            config._config.port.should.be.equal(testConfig.port);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });
    });

    describe('when configPath does not exist', function() {
      beforeEach(function() {
        configPath = path.join(__dirname, 'non-existent-config.js');
        testConfig = require(config._config.paths.configExample)[
          process.env.NODE_ENV];
      });

      it('loads example configuration to _config', function(done) {
        config.load(configPath)
          .then(function() {
            config._config.db.should.be.equal(testConfig.db);
            config._config.port.should.be.equal(testConfig.port);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      afterEach(function(done) {
        fs.unlink(configPath, done);
      });
    });
  });
});
