import 'app/main';
import ServiceActionButtonCtrl from 'app/serviceactionbutton/serviceactionbutton.ctrl';
import {module} from 'angular-mocks';

describe('ServiceActionButtonCtrl', () => {
  let http
    , servers
    , server
    , controller;

  beforeEach(() => {
    module('app');

    inject(($injector, $httpBackend) => {
      http = $httpBackend;
      servers = $injector.get('Servers');
      server = {
        hostname: 'monit.myapp.com'
      };
      servers.current = server;
      controller = new ServiceActionButtonCtrl($injector.get('$http'), servers);
      controller.name = 'restart';
      controller.service = {
        name: 'nginx'
      };
    });
  });

  describe('getActionsUrl', () => {
    it('returns the service actions path', () => {
      var expected = '/server/monit.myapp.com/service/nginx/actions';
      expect(controller.getActionsUrl()).toBe(expected);
    });
  });

  describe('handleClick', () => {
    beforeEach(() => {
      var actionsUrl = '/server/monit.myapp.com/service/nginx/actions';
      http.expect('POST', actionsUrl, {name: controller.name})
        .respond(200, {});
      spyOn(controller, 'getActionsUrl')
        .and.callFake(() => {
          return actionsUrl;
        });
    });

    it('requests a new action to be scheduled', (done) => {
      controller.handleClick()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
      http.flush();
    });
  });
});
