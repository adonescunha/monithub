import 'app/main';
import {module} from 'angular-mocks';

let servers
  , http
  , controller
  , state
  , snackbar;

describe('NewServerCtrl', () => {
  beforeEach(() => {
    module('app');

    inject(($state, $httpBackend, $injector, $controller) => {
      state = $state;
      http = $httpBackend;
      snackbar = $injector.get('snackbar');
      servers = $injector.get('Servers');
      controller = $controller('NewServerCtrl', {
        $state: state,
        Servers: servers
      });
      spyOn(controller, 'init').and.callThrough();
      spyOn(state, 'go');
      spyOn(snackbar, 'create');
    });
  });

  describe('createServer', () => {
    describe('when valid', () => {
      beforeEach(() => {
        spyOn(servers, 'create').and.callFake(() => {
          return {
            then: (callback) => {
              return callback();
            }
          };
        });

        spyOn(servers, 'sync');
      });

      it('should create a server', () => {
        controller.server = {
          hostname: 'hostname'
        };
        controller.createServer();
        expect(servers.create).toHaveBeenCalled();
        expect(servers.sync).toHaveBeenCalled();
        expect(state.go)
          .toHaveBeenCalledWith('app.servers.show', {
            hostname: controller.server.hostname
          });
        expect(snackbar.create).toHaveBeenCalledWith(
          'Server successfully added.', 5000);
      });
    });

    describe('when invalid', () => {
      it('should log erro', () => {
        spyOn(controller, 'logError');
        http.expectPOST('/servers').respond(400);
        controller.createServer();
        http.flush();
        expect(controller.init).not.toHaveBeenCalled();
        expect(controller.logError).toHaveBeenCalled();
      });
    });
  });
});
