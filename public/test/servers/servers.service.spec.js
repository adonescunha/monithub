import 'app/main';
import {module} from 'angular-mocks';

let http;

describe('ServerService', () => {
  beforeEach(() => {
    module('app');

    inject(($httpBackend, $q, $injector) => {
      http = $httpBackend;
      serverService = $injector.get('ServerService');
    });
  });

  describe('create', () => {
    describe('when response status is 200', () => {
      it('returns response data', (done) => {
        let expected = 'OK';
        http.expectPOST('/services').respond(200, expected);
        serverService.create({})
          .then((actual) => {
            expect(actual).toEqual(expected);
            done();
          })
          .catch((err) => {
            done(err);
          });
        http.flush();
      });
    });
  })
});
