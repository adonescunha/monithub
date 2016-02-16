'use strict';

var express = require('express')
  , router = express.Router({mergeParams: true})
  , Service = require('../models/service').Service
  , findServerOr404 = require('./utils').findServerOr404;

router.get('', function(req, res) {
  return findServerOr404(req, res, {
    hostname: req.params.hostname
  })
    .then(function(res) {
      var query = {
        server: req.params.server
      };

      if ('type' in req.query) {
        query.type = req.query.type;
      }

      return Service.find(query);
    })
    .then(function(services) {
      return res.status(200).json(services);
    })
    .catch(function(err) {
      if (err.response !== undefined) {
        return err.response;
      }

      throw err;
    });
});

module.exports = router;
