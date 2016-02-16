'use strict';

require('../spec_helper');

var assert = require('assert')
  , sinon = require('sinon')
  , res = require('express').response
  , Server = require('../../lib/models/server').Server
  , SERVER_DOES_NOT_EXIST_MESSAGE = require('../../lib/errors').SERVER_DOES_NOT_EXIST_MESSAGE
  , findServerOr404 = require('../../lib/routers/utils').findServerOr404;

describe('findServerOr404', function() {
  var hostname = 'monit.myapp.com'
    , req;

  beforeEach(function() {
    req = {
      params: {
        hostname: hostname
      }
    };
    res.app = app;
  });

  describe('when server exists', function() {
    beforeEach(function(done) {
      Server.create({
        hostname: hostname
      })
        .then(function() {
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('assigns the server found to req.params', function(done) {
      findServerOr404(req, res, {
        hostname: hostname
      })
        .then(function(res) {
          req.params.server.hostname.should.be.equal(hostname);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('when server does not exists', function() {
    beforeEach(function() {
      sinon.stub(res, 'json');
    });

    afterEach(function() {
      res.json.restore();
    });

    it('raises DoesNotExistError', function(done) {
      findServerOr404(req, res, {
        hostname: hostname
      })
        .then(function(res) {
          assert.fail();
        })
        .catch(function(err) {
          if (err.response !== undefined) {
            err.response.statusCode.should.be.equal(404);
            assert(err.response.json.calledWith({
              message: SERVER_DOES_NOT_EXIST_MESSAGE
            }));
            done();
          } else {
            done(err);
          }
        });
    });
  });
});
