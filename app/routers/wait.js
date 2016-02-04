/* jshint node: true */
'use strict';

var kue = require('kue')
  , queue = kue.createQueue();

module.exports = function(io) {
  var express = require('express')
    , router = express.Router();

  io.on('connection', function(socket) {
    console.log('NEW CONNECTION');
  });

  router.get('', function(req, res) {
    console.log('WAIT CALLED');
    queue.create('wait').save();
    return res.status(200);
  });

  return router;
};
