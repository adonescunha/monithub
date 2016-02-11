import 'app/main';
import {module} from 'angular-mocks';

let controller
  , servers
  , services
  , server
  , servicesStub
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
        return Promise.resolve(server);
      });
      services = $injector.get('Services');
      $stateParams = $injector.get('$stateParams');
      $stateParams.hostname = hostname;
      controller = $controller('ShowServerCtrl', {
        $scope: $scope,
        $stateParams: $stateParams,
        Servers: servers,
        Services: services,
        Socket: socketMock
      });
    });
  });

  // describe('init', () => {
  //   it('fetches the server', function() {
  //     expect(socketMock.on)
  //       .toHaveBeenCalledWith('server-refreshed', jasmine.any(Function));
  //     expect($scope.server).toBe(server);
  //   });
  // });

  describe('getServer', () => {
    beforeEach(() => {
      spyOn(controller, 'getServices');
    });

    it('returns a promise of a server request', (done) => {
      controller.getServer()
        .then(() => {
          expect(servers.get).toHaveBeenCalledWith(hostname);
          expect(controller.getServices).toHaveBeenCalled();
          expect(scope.server).toBe(server);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe('getServices', () => {
    var servicesStub;

    beforeEach(() => {
      servicesStub = [
        {
          type: 1
        },
        {
          type: 2
        },
        {
          type: 2
        }
      ];
      spyOn(services, 'list').and.callFake(() => {
        return Promise.resolve(servicesStub);
      });
    });

    it('returns a promise of services request', (done) => {
      $scope.server = server;
      controller.getServices()
        .then(() => {
          expect(services.list).toHaveBeenCalledWith(server.hostname);
          expect(scope.services).toBe(servicesStub);
          done();
        })
        .catch((err) => {
          done(err);
        });
    })
  });
});
