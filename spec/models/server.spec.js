/* jshint node: true */
'use strict';

require('../spec_helper');

var Server = require('../../app/models/server').Server
  , Service = require('../../app/models/service').Service
  , server;

describe('Server', function() {
  describe('updateStatus', function() {

    beforeEach(function(done) {
      Server.create({
        hostname: 'myapp.monit.com',
        status: 1
      })
        .then(function(newServer) {
          server = newServer;

          return Service.create({
            server: server,
            name: 'nginx',
            type: 3,
            statuses: [{
              status: 0
            }]
          });
        })
        .then(function() {
          return Service.create({
            server: server,
            name: 'gunicorn',
            type: 3,
            statuses: [{
              status: 0
            }]
          });
        })
        .then(function() {
          return Service.create({
            server: server,
            name: 'elasticsearch',
            type: 3,
            statuses: [{
              status: 0
            }]
          });
        })
        .then(function() {
          done();
        });
    });

    it('sets it to 0 when all services statuses are running', function(done) {
      server.updateStatus()
        .then(function(newServer) {
          newServer.status.should.equal(0);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('sets it to 2 when at least one services have a warning', function(done) {
      Service.findOne({
        server: server,
        name: 'elasticsearch'
      })
        .then(function(service) {
          service.statuses[0].status = 2;
          return service.save();
        })
        .then(function() {
          return server.updateStatus();
        })
        .then(function(newServer) {
          newServer.status.should.equal(2);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});
