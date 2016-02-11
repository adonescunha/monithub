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

    inject(($injector) => {
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
      controller = new ServicesListCtrl(null, services);
      controller.services = servicesStub;
    });
  });

  describe('init', function() {
    it('groups them by type', () => {
      controller.init();
      expect(_.size(controller.types)).toBe(2);
      expect(controller.types[1].length).toBe(1);
      expect(controller.types[2].length).toBe(2);
    });
  });
});
