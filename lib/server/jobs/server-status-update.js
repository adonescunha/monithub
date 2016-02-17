'use strict';

var kue = require('kue')
  , queue = kue.createQueue()
  , Server = require('../models/server').Server
  , ServerStatusUpdate = require('../services/server-status-update');

module.exports = function(io) {
  var jobHandler = function(job, done) {
    return Server.findById(job.data.server_id)
      .then(function(server) {
        var serverStatusUpdate = new ServerStatusUpdate({server: server});
        return serverStatusUpdate.perform();
      })
      .then(function(server) {
        io.emit('server-' + job.data.server_id + 'refreshed', {server: server});
        queue.create('server-status-update', {
          server_id: server._id
        })
          .delay(server.poll * 1000)
          .save();
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
