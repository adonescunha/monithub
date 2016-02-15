'use strict';

var assert = require('assert')
  , sinon = require('sinon')
  , request = require('supertest-as-promised')
  , app = require('../../serve')
  , Server = require('../../app/models/server').Server
  , Service = require('../../app/models/service').Service
  , kue = require('kue')
  , queue = kue.createQueue();

describe('POST /server/:hostname/service/:name/actions', function() {
  var server
    , service;

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

  afterEach(function() {
    queue.create.restore();
  });

  it('schedules service-action job', function(done) {
    request(app)
      .post('/server/monit.myapp.com/service/nginx/actions')
      .send({name: 'restart'})
      .then(function(res) {
        res.status.should.be.equal(200);
        assert(queue.create.calledWith(
          'service-action',
          {
            service_id: service._id,
            action: 'restart'
          }));
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});
