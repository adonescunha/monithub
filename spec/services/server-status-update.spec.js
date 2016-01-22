require('../spec_helper');
var nock    = require('nock');
var Server  = require('../../app/models/server').Server;
var Service = require('../../app/models/service').Service;
var ServerStatusUpdate = require('../../app/services/server-status-update');

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

describe('ServerStatusUpdate', function() {
  var server;
  var hostname = 'monit.myapp.com';

  beforeEach(function() {
    nock('http://' + hostname + ':2812')
      .get('/_status')
      .query({format: 'xml'})
      .reply(200, RESPONSE_BODY);
  });

  describe('perform', function() {
    it('creates the services which does not exists', function(done) {
      Server.create({
        hostname: hostname
      })
        .then(function(newServer) {
          server = newServer;
          return Service.create({
            server: server,
            name: 'nginx',
            type: 3
          });
        })
        .then(function(service) {
          service.statuses.length.should.equal(0);
          var serverStatusUpdate = new ServerStatusUpdate(server);
          return serverStatusUpdate.perform();
        })
        .then(function() {
          return Service.find({server: server})
        })
        .then(function(services) {
          services.length.should.equal(2);
          var nginxService = services[0];
          var memcachedService = services[1];
          nginxService.statuses.length.should.equal(1);
          nginxService.statuses[0].collected_sec.should.equal(1453410411);
          memcachedService.statuses.length.should.equal(1);
          memcachedService.statuses[0].collected_sec.should.equal(1453479824);
          memcachedService.type.should.equal(3);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('createServiceStatus', function() {
    it('creates a status based on the service xml node', function(done) {
      var serverStatusUpdate
        , service
        , serviceNode;

      Server.create({
        hostname: hostname
      })
        .then(function(newServer) {
          server = newServer;
          return Service.create({
            server: server,
            name: 'nginx',
            type: 3
          })
        })
        .then(function(newService) {
          service = newService;
          serverStatusUpdate = new ServerStatusUpdate(server);
          client = serverStatusUpdate.getClient();
          return client.status();
        })
        .then(function(result) {
          serviceNode = result.monit.service[0];
          service.statuses.length.should.equal(0);
          return serverStatusUpdate.createServiceStatus(service, serviceNode);
        })
        .then(function(service) {
          service.statuses.length.should.equal(1);
          var status = service.statuses[0];
          var memory = status.memory;
          var cpu = status.cpu;
          var memoryNode = serviceNode.memory[0];
          var cpuNode = serviceNode.cpu[0];

          status.collected_sec.should.equal(
            parseInt(serviceNode.collected_sec));
          status.collected_usec.should.equal(
            parseInt(serviceNode.collected_usec));
          status.status.should.equal(
            parseInt(serviceNode.status));
          status.status_hint.should.equal(
            parseInt(serviceNode.status_hint));
          status.monitor.should.equal(
            parseInt(serviceNode.monitor));
          status.monitormode.should.equal(
            parseInt(serviceNode.monitormode));
          status.pid.should.equal(
            parseInt(serviceNode.pid));
          status.ppid.should.equal(
            parseInt(serviceNode.ppid));
          status.uptime.should.equal(
            parseInt(serviceNode.uptime));
          status.children.should.equal(
            parseInt(serviceNode.children));
          memory.percent.should.equal(
            parseInt(memoryNode.percent[0]));
          memory.percenttotal.should.equal(
            parseInt(memoryNode.percenttotal[0]));
          memory.kilobyte.should.equal(
            parseInt(memoryNode.kilobyte[0]));
          memory.kilobytetotal.should.equal(
            parseInt(memoryNode.kilobytetotal[0]));
          cpu.percent.should.equal(
            parseInt(cpuNode.percent[0]));
          cpu.percenttotal.should.equal(
            parseInt(cpuNode.percenttotal[0]));

          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});
