'use strict'

var express = require('express')
  , router = express.Router()
  , Server = require('../models/server').Server;

router.post('', function(req, res) {
  Server.create(req.body)
    .then(function(server) {
      return res.status(200).json(server.toObject());
    })
    .catch(function(err) {
      if (err.name == 'ValidationError') {
        return res.status(400).json(err.errors);
      }

      throw err;
    })
});

module.exports = router;
