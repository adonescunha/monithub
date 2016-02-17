'use strict';

var express = require('express')
  , router = express.Router({mergeParams: true})
  , Server = require('../models/server').Server
  , SERVER_DOES_NOT_EXIST_MESSAGE = require('../errors').SERVER_DOES_NOT_EXIST_MESSAGE
  , kue = require('kue')
  , queue = kue.createQueue();

router.post('', function(req, res) {
  Server.findOne({
    hostname: req.params.hostname
  })
    .then(function(server) {
      if (server === null) {
        throw new Error(SERVER_DOES_NOT_EXIST_MESSAGE);
      }

      queue.create('server-status-update', {
        server_id: server._id
      }).save();
      return res.status(200).json({message: 'Sync successfully scheduled.'});
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
