'use strict';

var Promise = require('bluebird').Promise
  , Client  = require('monit').Client
  , Server  = require('../models/server').Server
  , Service = require('../models/service').Service
  , Status  = require('../models/status').Status;

var ServerStatusUpdate = function(server) {
  this.server = server;
};

ServerStatusUpdate.prototype.perform = function() {
  var self = this
    , client = this.getClient()
    , result;
  return client.status()
    .then(function(rst) {
      result = rst;
      var serverNode = result.monit.server;
      return Server.update({
        _id: self.server._id
      }, {
        poll: serverNode.poll,
        uptime: serverNode.uptime,
        localhostname: serverNode.localhostname
      });
    })
    .then(function() {
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
    username: this.server.username,
    password: this.server.password
  });
};

ServerStatusUpdate.prototype.createServiceStatus = function(service, serviceNode) {
  var status = new Status(serviceNode);

  service.statuses.unshift(status);
  return service.save();
};

module.exports = ServerStatusUpdate;
