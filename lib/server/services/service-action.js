'use strict';

var Base = require('./base')
  , inherits = require('util').inherits
  , Promise = require('bluebird').Promise
  , kue = require('kue')
  , queue = kue.createQueue();

var ServiceAction = function(options) {
  Base.call(this, options);
};

inherits(ServiceAction, Base);

ServiceAction.prototype.perform = function() {
  var self = this;
  var client = this.getClient();

  return client.action({
    service: this.options.service.name,
    action: this.options.action
  })
    .then(function() {
      return new Promise(function(resolve) {
        return resolve(queue.create('server-status-update', {
          server_id: self.options.server._id
        }).save());
      });
    })
    .catch(function(err) {
      throw err;
    });
};

module.exports = ServiceAction;
