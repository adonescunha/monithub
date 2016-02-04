'use strict';

var express = require('express')
  , router = express.Router({mergeParams: true})
  , Server = require('../models/server').Server
  , Service = require('../models/service').Service
  , SERVER_DOES_NOT_EXIST_MESSAGE = require('../errors').SERVER_DOES_NOT_EXIST_MESSAGE;

router.get('', function(req, res) {
  var server;

  Server.findOne({
    hostname: req.params.hostname
  })
    .then(function(server) {
      if (server === null) {
        throw new Error(SERVER_DOES_NOT_EXIST_MESSAGE);
      }

      return Service.find({
        server: server
      });
    })
    .then(function(services) {
      return res.status(200).json(services);
    })
    .catch(function(err) {
      if (err.message == SERVER_DOES_NOT_EXIST_MESSAGE) {
        return res.status(404).json({
          message: SERVER_DOES_NOT_EXIST_MESSAGE
        });
      }

      throw err;
    });
});

module.exports = router;
