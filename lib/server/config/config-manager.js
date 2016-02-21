'use strict';

var path = require('path')
  , fs = require('fs')
  , _ = require('lodash')
  , Promise = require('bluebird').Promise
  , appRoot = path.resolve(__dirname, '../../../');

var ConfigManager = function(config) {
  this._config = {};

  if (config !== undefined && _.isObject(config)) {
    this.set(config);
  }
};

ConfigManager.prototype.set = function(config) {
  _.merge(this._config, config);

  this._config.paths = this._config.paths || {};

  _.merge(this._config, {
    paths: {
      appRoot: appRoot,
      config: this._config.paths.config || path.join(appRoot, 'config.js'),
      configExample: path.join(appRoot, 'config.example.js')
    }
  });
};

ConfigManager.prototype.get = function() {
  return this._config;
};

ConfigManager.prototype.load = function(configFilePath) {
  var self = this;

  self._config.paths.config = (process.env.MONITHUB_CONFIG ||
                               configFilePath ||
                               self._config.paths.config);

    return new Promise(function (resolve, reject) {
      fs.stat(self._config.paths.config, function (err) {
        var exists = (err) ? false : true
          , pendingConfig;

        if (!exists) {
          pendingConfig = self.writeFile();
        }

        Promise.resolve(pendingConfig)
          .then(function() {
            return self.readFile();
          })
          .then(function(rawConfig) {
            resolve(self.set(rawConfig));
          })
          .catch(reject);
      });
    });
};

ConfigManager.prototype.writeFile = function() {
  var configPath = this._config.paths.config
    , configExamplePath = this._config.paths.configExample;

  return new Promise(function(resolve, reject) {
    var read
      , write;

    // Copy config.example.js => config.js
    read = fs.createReadStream(configExamplePath);
    read.on('error', reject);

    write = fs.createWriteStream(configPath);
    write.on('error', reject);
    write.on('finish', resolve);

    read.pipe(write);
  });
};

ConfigManager.prototype.readFile = function(envVal) {
  return require(this._config.paths.config)[
    envVal ||
    process.env.NODE_ENV ||
    'development'];
};

module.exports = ConfigManager;
