'use strict';

var Base = require('./base')
  , inherits = require('util').inherits
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
      queue.create('service-action', {
        service_id: self.options.service._id
      }).save();
    })
    .catch(function(err) {
      throw err;
    });
};

module.exports = ServiceAction;
