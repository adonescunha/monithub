'use strict';

var Promise = require('bluebird').Promise
  , Base  = require('./base')
  , Server  = require('../models/server').Server
  , Service = require('../models/service').Service
  , Status  = require('../models/status').Status
  , inherits = require('util').inherits;

var ServerStatusUpdate = function(options) {
  Base.call(this, options);
};

inherits(ServerStatusUpdate, Base);

ServerStatusUpdate.prototype.perform = function() {
  var self = this
    , client = this.getClient()
    , result;
  return client.status()
    .then(function(rst) {
      result = rst;
      var serverNode = result.monit.server;
      return Server.update({
        _id: self.options.server._id
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
          server: self.options.server,
          name: serviceName
        })
          .then(function(service) {
            if (!service) {
              return Service.create({
                server: self.options.server,
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
      return self.options.server.updateStatus();
    })
    .catch(function(err) {
      throw err;
    });
};

ServerStatusUpdate.prototype.createServiceStatus = function(service, serviceNode) {
  var status = new Status(serviceNode);
  status.service = service;
  status.save();

  service.status = status;
  return service.save();
};

module.exports = ServerStatusUpdate;
