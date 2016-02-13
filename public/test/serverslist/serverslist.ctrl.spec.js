import 'app/main';
import ServersListCtrl from 'app/serverslist/serverslist.ctrl';
import {module} from 'angular-mocks';

let controller
  , data
  , servers;

describe('ServersListCtrl', () => {
  beforeEach(() => {
    module('app');

    inject(($injector) => {
      servers = $injector.get('Servers');
      spyOn(servers, 'list').and.callFake(() => {
        return {
          then: (callback) => {
            callback(data);
          }
        };
      });
      controller = new ServersListCtrl(servers);
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
