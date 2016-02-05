'use strict';

var express = require('express')
  , router = express.Router()
  , servicesRouter = require('./services')
  , syncsRouter = require('./syncs')
  , Server = require('../models/server').Server
  , SERVER_DOES_NOT_EXIST_MESSAGE = require('../errors').SERVER_DOES_NOT_EXIST_MESSAGE;

router.use('/:hostname/services', servicesRouter);

router.use('/:hostname/syncs', syncsRouter);

router.get('/:hostname', function(req, res) {
  Server.findOne({
    hostname: req.params.hostname
  })
    .then(function(server) {
      if (server === null) {
        return res.status(404).json({
          message: SERVER_DOES_NOT_EXIST_MESSAGE
        });
      }

      return res.status(200).json(server);
    })
    .catch(function(err) {
      throw err;
    });
});

module.exports = router;
