'use strict';

require('../spec_helper');

var Server  = require('../../app/models/server').Server
  , Service = require('../../app/models/service').Service;

describe('Service', function() {
  var server
    , service;

  beforeEach(function(done) {
    Server.create({
      hostname: 'monit.myapp.com'
    })
      .then(function(newServer) {
        server = newServer;
        service = Service({
          server: server,
          name: 'nginx',
          type: 3
        });
        done();
      });
  });

  describe('incrementServerServicesCount', function() {
    it('increments server services_count when value is positive', function(done) {
      server.services_count.should.equal(0);
      service.incrementServerServicesCount(1)
        .then(function() {
          return Server.findById(server._id);
        })
        .then(function(server) {
          server.services_count.should.equal(1);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('decrements server services_count when value is negative', function(done) {
      server.services_count = 2;
      server.save()
        .then(function() {
          return service.incrementServerServicesCount(-1);
        })
        .then(function() {
          return Server.findById(server._id);
        })
        .then(function(server) {
          server.services_count.should.equal(1);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});
