'use strict';

var express = require('express')
  , router = express.Router()
  , Server = require('../models/server').Server;

module.exports = function(io) {
  router.post('', function(req, res) {
    Server.create(req.body)
      .then(function(server) {
        io.emit('server-created', {server: server});
        return res.status(200).json(server.toObject());
      })
      .catch(function(err) {
        if (err.name == 'ValidationError') {
          return res.status(400).json(err.errors);
        }

        throw err;
      });
  });

  router.get('', function(req, res) {
    Server.find({})
      .then(function(servers) {
        return res.status(200).json(servers);
      })
      .catch(function(err) {
        throw err;
      });
  });

  return router;
};
