'use strict';

var config = require('./config')
  , kue = require('kue')
  , mongoose = require('mongoose')
  , Promise = require('bluebird').Promise;

var Server = function(rootApp) {
  this.rootApp = rootApp;
};

Server.prototype.start = function(parentApp) {
  var self = this
    , app = parentApp !== undefined ? parentApp : this.rootApp
    , port = config.port
    , httpServer = require('http').createServer(parentApp)
    , io = require('socket.io').listen(httpServer);

  return new Promise(function(resolve) {
    require('./jobs/wait')(io);
    require('./jobs/server-status-update')(io);

    mongoose.Promise = require('bluebird').Promise;

    if (mongoose.connection.db === undefined) {
      mongoose.connect(config.db);
    }

    self.rootApp.use('/kue', kue.app);
    self.rootApp.use('/servers', require('./routers/servers')(io));
    self.rootApp.use('/server', require('./routers/server'));
    self.rootApp.use('/wait', require('./routers/wait')(io));

    httpServer.listen(port, function () {
      console.log('MonitHub app listening on port ' + port + '!');
    });

    return self;
  });
};

module.exports = Server;
