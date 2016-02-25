'use strict';

var Base = require('./base')
  , inherits = require('util').inherits
  , Server = require('../models/server').Server;

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
      return Server.sync({
        _id: self.options.server._id
      });
    })
    .catch(function(err) {
      throw err;
    });
};

module.exports = ServiceAction;
