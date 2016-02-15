'use strict';

var express = require('express')
  , router = express.Router({mergeParams: true})
  , Server = require('../models/server').Server
  , Service = require('../models/service').Service
  , kue = require('kue')
  , queue = kue.createQueue()
  , SERVER_DOES_NOT_EXIST_MESSAGE = require('../errors').SERVER_DOES_NOT_EXIST_MESSAGE;

router.post('/:name/actions', function(req, res) {
  var server;

  Server.findOne({
    hostname: req.params.hostname
  })
    .then(function(serverFound) {
      if (serverFound === null) {
        throw new Error(SERVER_DOES_NOT_EXIST_MESSAGE);
      }

      server = serverFound;
      return Service.findOne({
        server: server,
        name: req.params.name
      });
    })
    .then(function(service) {
      queue.create('service-action', {
        service_id: service._id,
        action: req.body.name
      }).save();
      return res.status(200).json({message: 'OK'});
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
