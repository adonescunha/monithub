import 'app/main';
import {module} from 'angular-mocks';
import {Promise} from 'bluebird';
import ServerDetailCtrl from 'app/serverdetail/serverdetail.ctrl';

let servers
  , state
  , controller
  , snackbar
  , hostname = 'monit.myapp.com';

describe('ServerDetailCtrl', () => {
  beforeEach(() => {
    module('app');

    inject(($injector, $state) => {
      state = $state;
      servers = $injector.get('Servers');
      snackbar = $injector.get('snackbar');
      controller = new ServerDetailCtrl(state, null, servers, snackbar);
      controller.server = {
        hostname: hostname
      };
      spyOn(snackbar, 'create');
      spyOn(state, 'go');
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

  describe('.delete', () => {
    let expected;

    beforeEach(() => {
      expected = {
        message: controller.hostname + ' have been deleted'
      };

      spyOn(servers, 'delete').and.callFake(() => {
        return new Promise.resolve(expected);
      });
    });

    it('requests the server to be deleted', (done) => {
      controller.delete()
        .then(() => {
          expect(state.go)
            .toHaveBeenCalledWith('app');
          expect(snackbar.create).toHaveBeenCalledWith(
            expected.message, 5000);
          expect(servers.delete).toHaveBeenCalledWith(hostname);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
