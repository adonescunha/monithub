import 'app/main';
import {module} from 'angular-mocks';

let serverService
  , http
  , controller;

describe('NewServerCtrl', () => {
  beforeEach(() => {
    module('app');

    inject(($httpBackend, $injector, $controller) => {
      http = $httpBackend;
      serverService = $injector.get('ServerService');
      controller = $controller('NewServerCtrl', {
        ServerService: serverService
      });
      spyOn(controller, 'init').and.callThrough();
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
      });
    });

    describe('when invalid', () => {
      it('should log erro', () => {
        spyOn(controller, 'logError');
        http.expectPOST('/services').respond(400);
        controller.createServer();
        http.flush();
        expect(controller.init).not.toHaveBeenCalled();
        expect(controller.logError).toHaveBeenCalled();
      });
    });
  });
});
