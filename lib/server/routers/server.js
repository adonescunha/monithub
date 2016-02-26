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

router.delete('/:hostname', function(req, res) {
  findServerOr404(req, res, {
    hostname: req.params.hostname
  })
    .then(function(res) {
      return req.params.server.remove();
    })
    .then(function() {
      var message = req.params.server.hostname + ' have been deleted.';
      return res.status(200).json({message: message});
    })
    .catch(function(err) {
      if (err.response !== undefined) {
        return err.response;
      }

      throw err;
    });
});

module.exports = router;
