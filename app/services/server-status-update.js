'use strict';

var Promise = require('bluebird').Promise;
var Client  = require('monit').Client;
var Service = require('../models/service').Service;
var Status  = require('../models/status').Status;

var ServerStatusUpdate = function(server) {
  this.server = server;
};

ServerStatusUpdate.prototype.perform = function() {
  var self = this;
  var client = this.getClient();
  return client.status()
    .then(function(result) {
      return Promise.each(result.monit.service, function(serviceNode) {
        var serviceName = serviceNode.name;
        return Service.findOne({
          server: self.server,
          name: serviceName
        })
          .then(function(service) {
            if (!service) {
              return Service.create({
                server: self.server,
                name: serviceName,
                type: serviceNode.$.type
              })
                .then(function(service) {
                  self.createServiceStatus(service, serviceNode);
                });
            } else {
              self.createServiceStatus(service, serviceNode);
            }
          });
        });
      })
    .then(function() {
      return self.server.updateStatus();
    })
    .catch(function(err) {
      throw err;
    });
};

ServerStatusUpdate.prototype.getClient = function() {
  return new Client({
    hostname: this.server.hostname,
    port: this.server.port,
    ssl: this.server.ssl,
    username: this.server.port,
    password: this.server.password
  });
};

ServerStatusUpdate.prototype.createServiceStatus = function(service, serviceNode) {
  var status = new Status(serviceNode);

  service.statuses.unshift(status);
  return service.save();
};

module.exports = ServerStatusUpdate;
