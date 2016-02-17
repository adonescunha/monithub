'use strict';

var express = require('express')
  , router = express.Router({mergeParams: true})
  , routersUtils = require('./utils')
  , findServerOr404 = routersUtils.findServerOr404
  , findServiceOr404 = routersUtils.findServiceOr404
  , kue = require('kue')
  , queue = kue.createQueue();

router.post('/:name/actions', function(req, res) {
  findServerOr404(req, res, {
    hostname: req.params.hostname
  })
    .then(function(res) {
      return findServiceOr404(req, res, {
        server: req.params.server,
        name: req.params.name
      });
    })
    .then(function(res) {
      queue.create('service-action', {
        service_id: req.params.service._id,
        action: req.body.name
      }).save();
      return res.status(200).json({message: 'OK'});
    })
    .catch(function(err) {
      if (err.response !== undefined) {
        return res;
      }

      throw err;
    });
});

module.exports = router;
