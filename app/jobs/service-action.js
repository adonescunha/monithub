'use strict';

var kue = require('kue')
  , queue = kue.createQueue()
  , Service = require('../models/service').Service
  , Server = require('../models/service').Server
  , ServiceAction = require('../services/service-action');

var jobHandler = function(job, done) {
  var service;

  return Service.findById(job.data.service_id)
    .then(function(serviceFound) {
      service = serviceFound;
      return Server.findById(service.server);
    })
    .then(function(server) {
      var serviceAction = new ServiceAction({
        server: server,
        service: service,
        action: job.data.action
      });
      serviceAction.perform();
    })
    .catch(function(err) {
      done(err);
    });
};

queue.process('service-action', jobHandler);

module.exports = jobHandler;