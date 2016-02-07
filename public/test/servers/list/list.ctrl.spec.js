import 'app/main';
import {module} from 'angular-mocks';

let controller
  , data
  , servers;

describe('ListServersCtrl', () => {
  beforeEach(() => {
    module('app');

    inject(($injector, $controller) => {
      servers = $injector.get('Servers');
      controller = $controller('ListServersCtrl', {
        Servers: servers
      });
      spyOn(servers, 'list').and.callFake(() => {
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
      expect(servers.list).toHaveBeenCalled();
      expect(controller.servers.length).toEqual(2);
    });
  });
});
