'use strict';

var defaultConfig
  , ConfigManager = require('./config-manager');

defaultConfig  = require('../../../config.example')[process.env.NODE_ENV ||
                                                    'development'];

module.exports = new ConfigManager(defaultConfig);
