'use strict';

var express = require('express')
  , router = express.Router()
  , servicesRouter = require('./services')
  , serviceRouter = require('./service')
  , syncsRouter = require('./syncs')
  , findServerOr404 = require('./utils').findServerOr404;

router.use('/:hostname/services', servicesRouter);

router.use('/:hostname/service', serviceRouter);

router.use('/:hostname/syncs', syncsRouter);

router.get('/:hostname', function(req, res) {
  findServerOr404(req, res, {
    hostname: req.params.hostname
  })
    .then(function(res) {
      return res.status(200).json(req.params.server);
    })
    .catch(function(err) {
      if (err.response !== undefined) {
        return err.response;
      }

      throw err;
    });
});

module.exports = router;
