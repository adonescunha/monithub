'use strict';

require('../spec_helper');

var assert = require('assert')
  , sinon = require('sinon')
  , request = require('supertest-as-promised')
  , Server  = require('../../server/models/server').Server
  , kue = require('kue')
  , queue = kue.createQueue();

describe('POST /server/:hostname/syncs', function() {
  var syncsUrl = '/server/monit.myapp.com/syncs';

  describe('when server exists', function() {
    var server;

    beforeEach(function(done) {
      sinon.stub(queue, 'create', function() {
        return {
          save: function() {}
        };
      });
      Server.create({
        hostname: 'monit.myapp.com'
      })
        .then(function(newServer) {
          server = newServer;
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    afterEach(function() {
      queue.create.restore();
    });

    it('schedule server-status-update job', function(done) {
      request(app)
        .post(syncsUrl)
        .then(function(res) {
          res.status.should.be.equal(200);
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

  describe('when server does not exists', function() {
    it('responds 404', function(done) {
      request(app)
        .post(syncsUrl)
        .then(function(res) {
          res.status.should.be.equal(404);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});
