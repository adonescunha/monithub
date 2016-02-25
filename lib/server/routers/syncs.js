'use strict';

var express = require('express')
  , router = express.Router({mergeParams: true})
  , Server = require('../models/server').Server
  , findServerOr404 = require('./utils').findServerOr404;

router.post('', function(req, res) {
  var hostname = req.params.hostname;

  return findServerOr404(req, res, {
    hostname: hostname
  })
    .then(function(res) {
      return Server.sync({
        hostname: hostname
      });
    })
    .then(function() {
      return res.status(200).json({message: 'Sync successfully scheduled.'});
    })
    .catch(function(err) {
      if (err.response !== undefined) {
        return err.response;
      }

      throw err;
    });
});

module.exports = router;
