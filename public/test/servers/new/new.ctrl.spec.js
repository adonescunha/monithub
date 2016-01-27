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
      spyOn(serverService, 'create').and.callThrough();
    });
  });

  describe('createServer', () => {
    it('should create a server', () => {
      http.expectPOST('/services');
      controller.createServer();
      expect(serverService.create).toHaveBeenCalled();
    });
  });
});
