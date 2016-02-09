import 'app/main';
import {module} from 'angular-mocks';

let controller
  , servers
  , server
  , $scope
  , $stateParams
  , hostname
  , socketMock;

describe('ShowServerCtrl', () => {
  beforeEach(() => {
    module('app');

    inject(($rootScope, $injector, $controller) => {
      $scope = $rootScope;
      socketMock = {
        on: (eventName, handler) => {}
      };
      spyOn(socketMock, 'on');
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
        $scope: $scope,
        $stateParams: $stateParams,
        Servers: servers,
        Socket: socketMock
      });
    });
  });

  describe('.init', () => {
    it('fetches the server', function() {
      expect(servers.get).toHaveBeenCalledWith(hostname);
      expect(socketMock.on)
        .toHaveBeenCalledWith('server-refreshed', jasmine.any(Function));
      expect($scope.server).toBe(server);
    });
  });

  describe('.sync', () => {
    beforeEach(() => {
      spyOn(servers, 'sync').and.callFake(() => {
        return {
          catch: (callback) => {}
        };
      });
    });

    it('requests the server to be synced', () => {
      controller.sync();
      expect(servers.sync).toHaveBeenCalledWith(hostname);
    });
  });
});
