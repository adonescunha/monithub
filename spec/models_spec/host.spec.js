var helper   = require('../spec_helper');
var Host     = require('../../app/models/host');

describe('Host', function() {
  it('starts with an empty collection', function(done) {
    Host.find({}, function(err, hosts) {
      if (err) return done(err);

      hosts.length.should.equal(0);
      done();
    });
  });

  it('can be saved', function(done) {
    Host.create(
      {
        domain: 'domain.com',
        port: 2812
      },
      function(err, host) {
        if (err) return done(err);

        host.domain.should.equal('domain.com');
        host.port.should.equal(2812);
        Host.find({}, function(err, hosts) {
          if (err) return done(err);

          hosts.length.should.equal(1);
          done();
        });
      }
    );
  });
});
