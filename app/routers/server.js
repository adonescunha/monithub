'use strict'

var express = require('express')
  , router = express.Router()
  , Server = require('../models/server').Server;

router.get('/:hostname', function(req, res) {
  Server.findOne({
    hostname: req.params.hostname
  })
    .then(function(server) {
      if (server === null) {
        return res.status(404).json({
          message: 'Server does not exist.'
        });
      }

      return res.status(200).json(server);
    })
    .catch(function(err) {
      throw err;
    });
});

module.exports = router;
