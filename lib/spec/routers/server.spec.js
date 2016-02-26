'use strict';

require('../spec_helper');

var request = require('supertest-as-promised')
  , Server  = require('../../server/models/server').Server;

describe('GET /server/:hostname', function() {
  describe('when a server with the provided hostname exists', function() {
    it('responds such server JSON representation', function(done) {
      var server;

      Server.create({
        hostname: 'monit.myapp.com'
      })
        .then(function(newServer) {
          server = newServer;
          return request(app)
            .get('/server/monit.myapp.com');
        })
        .then(function(res) {
          res.status.should.equal(200);
          res.body.hostname.should.equal(server.hostname);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('when a server with the provided hostname does not exists', function() {
    it('it responds 404', function(done) {
      request(app)
        .get('/server/monit.myapp.com')
        .then(function(res) {
          res.status.should.equal(404);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});

describe('DELETE /server/:hostname', function() {
  it('deletes the server', function(done) {
    var server;

    Server.create({
      hostname: 'monit.myapp.com'
    })
      .then(function(newServer) {
        server = newServer;
        return request(app)
          .del('/server/monit.myapp.com');
      })
      .then(function(res) {
        res.status.should.equal(200);
        res.body.message.should.equal(server.hostname + ' have been deleted.');
        return Server.find({
          _id: server._id
        });
      })
      .then(function(servers) {
        servers.length.should.be.equal(0);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});
