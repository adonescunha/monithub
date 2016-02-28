import 'app/main';
import {module} from 'angular-mocks';

let http
  , servers
  , cookies
  , server
  , hostname;

describe('Servers', () => {
  beforeEach(() => {
    module('app');

    inject(($httpBackend, $q, $injector, $cookies) => {
      http = $httpBackend;
      cookies = $cookies;
      servers = $injector.get('Servers');
    });

    hostname = 'monit.myapp.com';
    server = {
      hostname: hostname
    };
  });

  describe('get', () => {
    beforeEach(() => {
      http.expectGET('/server/' + hostname).respond(200, server);
    });

    it('returns the fetched server', (done) => {
      servers.get(hostname)
        .then((actual) => {
          expect(actual.hostname).toBe(server.hostname);
          expect(servers.current.hostname).toBe(server.hostname);
          expect(cookies.get('current-server')).toBe(server.hostname);
          done();
        })
        .catch((err) => {
          done(err);
        });
      http.flush();
    });
  });

  describe('delete', () => {
    let expectedData;

    beforeEach(() => {
      expectedData = {
        message: server.hostname + ' have been deleted.'
      };
      cookies.put('current-server', server.hostname);
      http.expectDELETE('/server/' + hostname).respond(200, expectedData);
    });

    it('returns the fetched server', (done) => {
      servers.delete(hostname)
        .then((data) => {
          expect(data.message).toBe(expectedData.message);
          expect(cookies.get('current-server')).toBe(undefined);
          done();
        })
        .catch((err) => {
          done(err);
        });
      http.flush();
    });
  });

  describe('list', () => {
    beforeEach(() => {
      http.expectGET('/servers').respond(200, [1, 2]);
    });

    it('returns response data', (done) => {
      servers.list()
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
        servers.create({})
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
        servers.create({})
          .then(() => {}, (response) => {
            expect(response.status).toBe(400);
            expect(response.data).toBe(expected);
            done();
          })
          .catch((err) => {
            done(err);
          });
        http.flush();
      });
    });
  });

  describe('.sync', () => {
    beforeEach(() => {
      http.expectPOST('/server/' + hostname + '/syncs')
        .respond(200, {message: 'OK'});
    });

    it('sends a POST request to /server/:hostname/syncs', (done) => {
      servers.sync(hostname)
        .then((response) => {
          expect(response.message).toBe('OK');
          done();
        })
        .catch((err) => {
          done(err);
        });
      http.flush();
    });
  });
});
