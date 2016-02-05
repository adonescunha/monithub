'use strict';

require('../spec_helper');

var chai = require('chai')
  , expect = chai.expect
  , nock = require('nock')
  , Server = require('../../app/models/server').Server
  , Service = require('../../app/models/service').Service;

var RESPONSE_BODY = `
  <?xml version="1.0" encoding="ISO-8859-1"?>
  <monit>
    <server>
      <id>91767252e99b1a45f1d2a21fa42f92f8</id>
      <incarnation>1453203838</incarnation>
      <version>5.6</version>
      <uptime>21360</uptime>
      <poll>120</poll>
      <startdelay>0</startdelay>
      <localhostname>dummy-host</localhostname>
      <controlfile>/etc/monit/monitrc</controlfile>
      <httpd>
        <address>0.0.0.0</address>
        <port>2812</port>
        <ssl>0</ssl>
      </httpd>
    </server>
    <service type="3">
      <name>nginx</name>
      <collected_sec>1453410411</collected_sec>
      <collected_usec>721400</collected_usec>
      <status>0</status>
      <status_hint>0</status_hint>
      <monitor>1</monitor>
      <monitormode>0</monitormode>
      <pendingaction>0</pendingaction>
      <pid>10480</pid>
      <ppid>1</ppid>
      <uptime>36301</uptime>
      <children>4</children>
      <memory>
        <percent>0.0</percent>
        <percenttotal>0.0</percenttotal>
        <kilobyte>1456</kilobyte>
        <kilobytetotal>13592</kilobytetotal>
      </memory>
      <cpu>
        <percent>0.0</percent>
        <percenttotal>0.0</percenttotal>
      </cpu>
    </service>
    <service type="3">
      <name>memcached</name>
      <collected_sec>1453479824</collected_sec>
      <collected_usec>830084</collected_usec>
      <status>0</status>
      <status_hint>0</status_hint>
      <monitor>1</monitor>
      <monitormode>0</monitormode>
      <pendingaction>0</pendingaction>
      <pid>1060</pid>
      <ppid>1</ppid>
      <uptime>10876742</uptime>
      <children>0</children>
      <memory>
        <percent>0.0</percent>
        <percenttotal>0.0</percenttotal>
        <kilobyte>5204</kilobyte>
        <kilobytetotal>5204</kilobytetotal>
      </memory>
      <cpu>
        <percent>0.0</percent>
        <percenttotal>0.0</percenttotal>
      </cpu>
      <port>
        <hostname>127.0.0.1</hostname>
        <portnumber>11211</portnumber>
        <request/>
        <protocol>DEFAULT</protocol>
        <type>TCP</type>
        <responsetime>0.000</responsetime>
      </port>
    </service>
  </monit>
`;

describe('server-status-update job', function() {
  var io
    , emitSpy
    , serverStatusUpdateJob
    , server;

  beforeEach(function(done) {
    io = {
      emit: function(event, data) {}
    };
    emitSpy = chai.spy.on(io, 'emit');
    serverStatusUpdateJob = require('../../app/jobs/server-status-update')(io);
    nock('http://monit.myapp.com:2812')
      .get('/_status')
      .query({format: 'xml'})
      .reply(200, RESPONSE_BODY);
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

  it('emits server-refreshed event on socket.io', function(done) {
    serverStatusUpdateJob({
      data: {
        server_id: server._id
      },
      done
    })
      .then(function(updatedServer) {
        server = updatedServer;
        return Service.find({
          server: updatedServer
        });
      })
      .then(function(services) {
        services.length.should.be.equal(2);
        expect(emitSpy).to.have.been.called.with(
          'server-refreshed', {server: server});
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});
