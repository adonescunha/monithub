'use strict';

require('../spec_helper');

var assert = require('assert')
  , sinon = require('sinon')
  , _ = require('lodash')
  , kue = require('kue')
  , queue = require('../../server/queue')
  , Server = require('../../server/models/server').Server
  , Service = require('../../server/models/service').Service
  , server;

describe('Server', function() {
  describe('sync', function() {
    beforeEach(function(done) {
      sinon.stub(queue, 'create', function() {
        return {
          save: function() {}
        };
      });

      Server.create({
        hostname: 'monit.myapp1.com'
      })
        .then(function() {
          return Server.create({
            hostname: 'monit.myapp2.com'
          });
        })
        .then(function() {
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    afterEach(function() {
      queue.create.restore();
    });

    it('schedule server-status-update job for each server', function(done) {
      Server.sync({})
        .then(function() {
          return Server.find({});
        })
        .then(function(servers) {
          _.each(servers, function(server) {
            assert(queue.create.calledWith(
              'server-status-update',
              {
                server_id: server._id
              }));
          });
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

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
            status: [{
              status: 0
            }]
          });
        })
        .then(function() {
          return Service.create({
            server: server,
            name: 'gunicorn',
            type: 3,
            status: [{
              status: 0
            }]
          });
        })
        .then(function() {
          return Service.create({
            server: server,
            name: 'elasticsearch',
            type: 3,
            status: [{
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
          service.status.status = 2;
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
