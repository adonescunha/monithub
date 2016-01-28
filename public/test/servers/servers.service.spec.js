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

  describe('list', () => {
    beforeEach(() => {
      http.expectGET('/servers').respond(200, [1, 2]);
    });

    it('returns response data', (done) => {
      serverService.list()
        .then((actual) => {
          expect(actual.length).toEqual(2);
          done();
        })
        .catch((err) => {
          done(err);
        });
      http.flush();
    });
  });

  describe('create', () => {
    let expected;

    describe('when response status is 200', () => {
      beforeEach(() => {
        expected = 'OK';
        http.expectPOST('/servers').respond(200, expected);
      });

      it('returns response data', (done) => {
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

    describe('when response status is not 200', () => {
      beforeEach(() => {
        expected = 'ERROR';
        http.expectPOST('/servers').respond(400, expected);
      });

      it('rejects response data', (done) => {
        serverService.create({})
          .then(() => {}, (actual) => {
            expect(actual.data).toEqual(expected);
            done();
          })
          .catch((err) => {
            done(err);
          });
        http.flush();
      });
    });
  });
});
