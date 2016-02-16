'use strict';

require('../spec_helper');

var assert = require('assert')
  , sinon = require('sinon')
  , nock = require('nock')
  , Server  = require('../../lib/models/server').Server
  , Service = require('../../lib/models/service').Service
  , ServiceAction = require('../../lib/services/service-action')
  , kue = require('kue')
  , queue = kue.createQueue();

describe('ServiceAction', function() {
  describe('perform', function() {
    var hostname = 'monit.myapp.com'
      , server
      , service
      , serviceAction;

    beforeEach(function() {
      sinon.stub(queue, 'create', function() {
        return {
          save: function() {}
        };
      });
      nock('http://' + hostname + ':2812')
        .post('/nginx', {action: 'restart'})
        .reply(200, 'OK');
    });

    afterEach(function() {
      queue.create.restore();
    });

    it('makes a post request to monit service url', function(done) {
      Server.create({
        hostname: hostname
      })
        .then(function(newServer) {
          server = newServer;
          return Service.create({
            server: server,
            name: 'nginx',
            type: 3
          });
        })
        .then(function(newService) {
          service = newService;
          serviceAction = new ServiceAction({
            server: server,
            service: service,
            action: 'restart'
          });
          return serviceAction.perform();
        })
        .then(function() {
          assert(queue.create.calledWith(
            'server-status-update',
            {
              server_id: server._id
            }
          ));
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});
