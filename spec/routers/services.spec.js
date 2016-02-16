'use strict';

require('../spec_helper');

var request = require('supertest-as-promised')
  , Server  = require('../../lib/models/server').Server
  , Service = require('../../lib/models/service').Service;

describe('GET /server/:hostname/services', function() {
  var servicesUrl = '/server/monit.myapp.com/services';

  describe('when server exists', function() {
    var server;

    beforeEach(function(done) {
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

    describe('and there\'s no service', function() {
      it('responds an empty array', function(done) {
        return request(app)
          .get(servicesUrl)
          .then(function(res) {
            res.body.length.should.equal(0);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });
    });

    describe('and there\'s any service', function() {
      it('responds an array of services', function(done) {
        Service.create({
          server: server,
          name: 'nginx',
          type: 3
        })
          .then(function() {
            return request(app)
              .get(servicesUrl);
          })
          .then(function(res) {
            res.body.length.should.equal(1);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });
    });

    describe('and a query param is passed', function() {
      it('responds a filtered array of services', function(done) {
        Service.create(
          {
            server: server,
            name: 'nginx',
            type: 3
          },
          {
            server: server,
            name: '/var/log/nginx/access.log',
            type: 2
          }
        )
          .then(function() {
            return request(app)
              .get(servicesUrl)
              .query({type: 2});
          })
          .then(function(res) {
            res.body.length.should.be.equal(1);
            res.body[0].type.should.be.equal(2);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });
    });
  });

  describe('when server does not exist', function() {
    it('reponds 404', function(done) {
      request(app)
        .get(servicesUrl)
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
