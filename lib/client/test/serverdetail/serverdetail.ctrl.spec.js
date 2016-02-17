import 'app/main';
import {module} from 'angular-mocks';
import ServerDetailCtrl from 'app/serverdetail/serverdetail.ctrl';

let servers
  , controller
  , hostname = 'monit.myapp.com';

describe('ServerDetailCtrl', () => {
  beforeEach(() => {
    module('app');

    inject(($injector) => {
      servers = $injector.get('Servers');
      controller = new ServerDetailCtrl(null, servers);
      controller.server = {
        hostname: hostname
      };
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
