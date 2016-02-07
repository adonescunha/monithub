import 'app/main';
import {module} from 'angular-mocks';

let hostname = 'monit.myapp.com'
  , services
  , http;

describe('Services', () => {
  beforeEach(() => {
    module('app');

    inject(($httpBackend, $injector) => {
      http = $httpBackend;
      services = $injector.get('Services');
    });
  });

  describe('list', () => {
    let servicesStub;

    beforeEach(() => {
      servicesStub = [1, 2, 3];
      http
        .expectGET('/server/' + hostname + '/services')
        .respond(200, servicesStub);
    });

    it('returns a list of services by hostname', (done) => {
      services
        .list(hostname)
        .then((actual) => {
          expect(actual.length).toBe(servicesStub.length);
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
      http.flush();
    });
  });
});
