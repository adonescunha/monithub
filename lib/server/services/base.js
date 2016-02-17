'use strict';

var Client  = require('monit').Client;

var Base = function(options) {
  if (options !== undefined) {
    this.options = options;
  } else {
    this.options = {};
  }
};

Base.prototype.getClient = function() {
  var server = this.options.server;
  return new Client({
    hostname: server.hostname,
    port: server.port,
    ssl: server.ssl,
    username: server.username,
    password: server.password
  });
};

module.exports = Base;
