import 'app/main';
import {module} from 'angular-mocks';

let serverService
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
      serverService = $injector.get('ServerService');
      controller = $controller('NewServerCtrl', {
        $state: state,
        ServerService: serverService
      });
      spyOn(controller, 'init').and.callThrough();
      spyOn(state, 'go');
      spyOn(snackbar, 'create');
    });
  });

  describe('createServer', () => {
    describe('when valid', () => {
      beforeEach(() => {
        spyOn(serverService, 'create').and.callFake(() => {
          return {
            then: (callback) => {
              return callback();
            }
          }
        });
      });

      it('should create a server', () => {
        controller.createServer();
        expect(serverService.create).toHaveBeenCalled();
        expect(controller.init).toHaveBeenCalled();
        expect(state.go).toHaveBeenCalledWith('app.servers.list');
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
