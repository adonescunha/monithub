/* jshint node: true */
'use strict';

var config = require('./config')
  , express = require('express')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')
  , kue = require('kue')
  , app = express()
  , http = require('http').createServer(app)
  , io = require('socket.io').listen(http);

require('./app/jobs/wait')(io);
require('./app/jobs/server-status-update')(io);

mongoose.Promise = require('bluebird').Promise;
mongoose.connect(config.db);

var port = config.port;
var kuePort = config.kuePort;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/servers', require('./app/routers/servers')(io));
app.use('/server', require('./app/routers/server'));
app.use('/wait', require('./app/routers/wait')(io));

http.listen(port, function () {
  console.log('MonitHub app listening on port ' + port + '!');
});

kue.app.listen(kuePort, function() {
  console.log('Kue app listening on port ' + kuePort + '!');
});

exports = module.exports = app;
