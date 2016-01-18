var helper   = require('../spec_helper');
var Host     = require('../../app/models/host');

describe('Host', function() {
  it('starts with an empty collection', function(done) {
    Host.find({}).then(function(hosts) {
      hosts.length.should.equal(0);
      done();
    }).catch(function(err) {
      console.error(err);
      return done(err);
    });
  });

  it('can be saved', function(done) {
    var domain = 'domain.com'
    var port   = 2812;

    Host.create({
      domain: domain,
      port: port
    }).then(function(host) {
      host.domain.should.equal(domain);
      host.port.should.equal(port);
      return Host.find({});
    }).then(function(hosts) {
      hosts.length.should.equal(1);
      done();
    }).catch(function(err) {
      console.error(err);
      return done(err);
    });
  });
});
