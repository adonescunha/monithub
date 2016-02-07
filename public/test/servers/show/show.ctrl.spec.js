import 'app/main';
import {module} from 'angular-mocks';

let controller
  , servers
  , server
  , $stateParams
  , hostname;

describe('ShowServerCtrl', () => {
  beforeEach(() => {
    module('app');

    inject(($injector, $controller) => {
      hostname = 'monit.myapp.com';
      server = {
        hostname: hostname
      };
      servers = $injector.get('Servers');
      spyOn(servers, 'get').and.callFake(() => {
        return {
          then: (callback) => {
            return callback(server);
          }
        };
      });
      $stateParams = $injector.get('$stateParams');
      $stateParams.hostname = hostname;
      controller = $controller('ShowServerCtrl', {
        $stateParams: $stateParams,
        Servers: servers
      });
    });
  });

  describe('#init', () => {
    it('fetches the server', function() {
      expect(servers.get).toHaveBeenCalledWith(hostname);
      expect(controller.server).toBe(server);
    });
  });
});
