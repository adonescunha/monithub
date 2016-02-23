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
    , port = config.get().port
    , httpServer = require('http').createServer(parentApp)
    , io = require('socket.io').listen(httpServer);

  return new Promise(function(resolve) {
    require('./jobs/server-status-update')(io);
    require('./jobs/service-action');

    mongoose.Promise = require('bluebird').Promise;

    config.load()
      .then(function() {
        if (mongoose.connection.db === undefined) {
          mongoose.connect(config.get().db);
        }

        self.rootApp.use('/kue', kue.app);
        self.rootApp.use('/servers', require('./routers/servers')(io));
        self.rootApp.use('/server', require('./routers/server'));

        httpServer.listen(port, function () {
          console.log('MonitHub app listening on port ' + port + '!');
        });

        return Promise.resolve(self);
      })
      .catch(function(err) {
        throw err;
      });
  });
};

module.exports = Server;
