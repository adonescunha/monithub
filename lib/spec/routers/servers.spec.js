'use strict';

require('../spec_helper');

var request = require('supertest-as-promised')
  , Server  = require('../../server/models/server').Server;

describe('POST /servers', function() {
  describe('when the request body is valid', function() {
    it('saves a new server', function(done) {
      var requestBody = {
        hostname: 'monit.myapp.com',
        username: 'admin',
        password: 'monit'
      };

      request(app)
        .post('/servers')
        .type('json')
        .send(requestBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(function(res) {
          res.status.should.equal(200);
          Server.find({})
            .then(function(servers) {
              var server = servers[0];
              servers.length.should.equal(1);
              server.hostname.should.equal(requestBody.hostname);
              server.username.should.equal(requestBody.username);
              server.password.should.equal(requestBody.password);
              done();
            });
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('when the request body is invalid', function() {
    it('responds a validation summary', function(done) {
      var requestBody = {
        username: 'admin',
        password: 'monit'
      };

      request(app)
        .post('/servers')
        .type('json')
        .send(requestBody)
        .then(function(res) {
          res.status.should.equal(400);
          Server.find({})
            .then(function(servers) {
              servers.length.should.equal(0);
              res.body.hostname.should.not.equal(undefined);
              done();
            });
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});

describe('GET /servers', function() {
  describe('when no server is saved', function() {
    it('responds an empty array', function(done) {
      request(app)
        .get('/servers')
        .then(function(res) {
          res.body.length.should.equal(0);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('when some servers are saved', function() {
    it('returns an array of servers', function(done) {
      Server.create({
        hostname: 'host1.myapp.com'
      })
        .then(function(server) {
          return Server.create({
            hostname: 'host2.myapp.com'
          });
        })
        .then(function(server) {
          return Server.find({});
        })
        .then(function(servers) {
          return request(app)
            .get('/servers');
        })
        .then(function(res) {
          res.body.length.should.equal(2);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});
