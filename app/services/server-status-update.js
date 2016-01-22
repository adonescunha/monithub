'use strict'

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
        var serviceName = serviceNode.name[0];
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
                })
            } else {
              self.createServiceStatus(service, serviceNode);
            }
          });
        });
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
  var status = new Status({
    collected_sec: serviceNode.collected_sec[0],
    collected_usec:  serviceNode.collected_usec[0],
    status: serviceNode.status[0],
    status_hint: serviceNode.status_hint[0],
    monitor: serviceNode.monitor[0],
    monitormode: serviceNode.monitormode[0],
    pid: serviceNode.pid[0],
    ppid: serviceNode.ppid[0],
    uptime: serviceNode.uptime[0],
    children: serviceNode.children[0]
  });

  if (serviceNode.memory !== undefined) {
    var memoryNode = serviceNode.memory[0];
    status.memory = {
      percent: memoryNode.percent[0],
      percenttotal: memoryNode.percenttotal[0],
      kilobyte: memoryNode.kilobyte[0],
      kilobytetotal: memoryNode.kilobytetotal[0]
    };
  }

  if (serviceNode.cpu !== undefined) {
    var cpuNode = serviceNode.cpu[0];
    status.cpu = {
      percent: cpuNode.percent[0],
      percenttotal: cpuNode.percenttotal[0]
    };
  }

  if (serviceNode.port !== undefined) {
    var portNode = serviceNode.port[0];
    status.port = {
      hostname: portNode.hostname[0],
      portnumber: portNode.portnumber[0],
      protocol: portNode.protocol[0],
      type: portNode.type[0],
      responsetime: portNode.responsetime[0]
    }
  }

  service.statuses.unshift(status);
  return service.save();
};

module.exports = ServerStatusUpdate;
