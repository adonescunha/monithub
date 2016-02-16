'use strict';

var nock = require('nock')
  , serviceActionJob = require('../../lib/jobs/service-action')
  , Server = require('../../lib/models/server').Server
  , Service = require('../../lib/models/service').Service;

describe('service-action job', function() {
  var hostname = 'monit.myapp.com'
    , server
    , service;

  beforeEach(function(done) {
    nock('http://' + hostname + ':2812')
      .post('/nginx', {action: 'restart'})
      .reply(200, 'OK');

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
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('performs service-update service', function(done) {
    serviceActionJob({
      data: {
        service_id: service._id,
        action: 'restart'
      }
    }, function() {})
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});
