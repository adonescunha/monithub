import 'app/main';
import ServersListCtrl from 'app/serverslist/serverslist.ctrl';
import {module} from 'angular-mocks';

let controller
  , data
  , servers
  , socket;

describe('ServersListCtrl', () => {
  beforeEach(() => {
    module('app');

    inject(($injector) => {
      servers = $injector.get('Servers');
      socket = $injector.get('Socket');
      spyOn(servers, 'list').and.callFake(() => {
        return {
          then: (callback) => {
            callback(data);
          }
        };
      });
      spyOn(socket, 'on');
      controller = new ServersListCtrl(null, servers, socket);
    });
  });

  describe('init', () => {
    beforeEach(() => {
      data = [1, 2];
    });

    it('fetch servers from API', () => {
      controller.init();
      expect(servers.list).toHaveBeenCalled();
      expect(socket.on)
        .toHaveBeenCalledWith('server-created', jasmine.any(Function));
      expect(controller.servers.length).toEqual(2);
    });
  });
});
