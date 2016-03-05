'use strict';

var kue = require('kue')
  , config = require('./config');

var currentQueue = function() {
  return kue.createQueue(config.get().kue);
};

module.exports = currentQueue();
