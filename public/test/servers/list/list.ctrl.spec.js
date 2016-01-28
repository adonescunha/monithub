import 'app/main';
import {module} from 'angular-mocks';

let controller
  , data
  , serverService;

describe('ListServersCtrl', () => {
  beforeEach(() => {
    module('app');

    inject(($injector, $controller) => {
      serverService = $injector.get('ServerService');
      controller = $controller('ListServersCtrl', {
        ServerService: serverService
      });
      spyOn(serverService, 'list').and.callFake(() => {
        return {
          then: (callback) => {
            return callback(data);
          }
        }
      });
    });
  });

  describe('init', () => {
    beforeEach(() => {
      data = [1, 2];
    });

    it('fetch servers from API', () => {
      controller.init();
      expect(serverService.list).toHaveBeenCalled();
      expect(controller.servers.length).toEqual(2);
    });
  });
});
