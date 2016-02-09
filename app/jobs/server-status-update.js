'use strict';

var kue = require('kue')
  , queue = kue.createQueue()
  , Server = require('../models/server').Server
  , ServerStatusUpdate = require('../services/server-status-update');

module.exports = function(io) {
  var jobHandler = function(job, done) {
    return Server.findById(job.data.server_id)
      .then(function(server) {
        var serverStatusUpdate = new ServerStatusUpdate(server);
        return serverStatusUpdate.perform();
      })
      .then(function(server) {
        io.emit('server-refreshed', {server: server});
        done();
        return server;
      })
      .catch(function(err) {
        done(err);
      });
  };

  queue.process('server-status-update', jobHandler);

  return jobHandler;
};
