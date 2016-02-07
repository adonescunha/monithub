import 'app/main';
import {module} from 'angular-mocks';
import 'app/serviceslist/serviceslist.module';
import ServicesListCtrl from 'app/serviceslist/serviceslist.ctrl';

let services
  , servicesStub
  , controller
  , hostname = 'monit.myapp.com';

describe('ServicesListCtrl', () => {
  beforeEach(() => {
    module('serviceslist');

    inject(($injector, $controller) => {
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
      services = $injector.get('Services');
      spyOn(services, 'list').and.callFake(() => {
        return {
          then: (callback) => {
            callback(servicesStub);
            return {
              catch: () => {}
            };
          }
        };
      });
      controller = new ServicesListCtrl(services);
    });
  });

  describe('init', function() {
    beforeEach(() => {
      controller.init(hostname);
    });

    it('fetches the services', () => {
      expect(services.list).toHaveBeenCalledWith(hostname);
      expect(controller.services).toBe(servicesStub);
    });

    it('groups them by type', () => {
      expect(_.size(controller.types)).toBe(2);
      expect(controller.types[1].length).toBe(1);
      expect(controller.types[2].length).toBe(2);
    });
  });
});
