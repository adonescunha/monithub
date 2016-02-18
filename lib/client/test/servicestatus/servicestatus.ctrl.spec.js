import 'app/main';
import ServiceStatusCtrl from 'app/servicestatus/servicestatus.ctrl';
import {module} from 'angular-mocks';

describe('ServiceStatusCtrl', () => {
  let service
    , controller
    , expected;

  beforeEach(() => {
    module('app');

    service = {
      status: {}
    };
    controller = new ServiceStatusCtrl();
    controller.service = service;
  });

  describe('getStatus', () => {
    describe('when monit status is 0 or 2', () => {
      expected = 'Initializing';

      beforeEach(() => {
        service.status.monitor = 2;
        spyOn(controller, 'getMonitorStatus').and.callFake(() => {
          return expected;
        });
      });

      it('returns the monitor status text', () => {
        expect(controller.getStatus()).toBe(expected);
      });
    });

    describe('when monitor status is 1', () => {
      beforeEach(() => {
        service.status.monitor = 1;
      });

      describe('and pendingaction is 0', () => {
        expected = 'Running';

        beforeEach(() => {
          spyOn(controller, 'getMonitorStatus');
          spyOn(controller, 'getServiceStatus').and.callFake(() => {
            return expected;
          });
        });

        it('returns the service status', () => {
          expect(controller.getStatus()).toBe(expected);
        });
      });

      describe('and pendingaction is not 0', () => {
        expected = 'Running - restart pending';

        beforeEach(() => {
          spyOn(controller, 'getMonitorStatus').and.callFake(() => {
            return 'restart pending';
          });
          spyOn(controller, 'getServiceStatus').and.callFake(() => {
            return 'Running';
          });
          service.status.pendingaction = 2;
        });

        it('returns the service status concatenated with the monitor status', () => {
          expect(controller.getStatus()).toBe(expected);
        });
      });
    });
  });

  describe('getServiceStatus', () => {
    let testCases = [
      {
        status: 512,
        expected: 'Does not exist'
      },

      {
        status: 16,
        expected: 'Size failed'
      },
      {
        status: 2,
        expected: 'Resource limit matched'
      }
    ];

    _.each(testCases, (testCase) => {
      describe('when status is ' + testCase.status, () => {
        beforeEach(() => {
          service.status.status = testCase.status;
        });

        it('returns "' + testCase.expected + '"', () => {
          expect(controller.getServiceStatus()).toBe(testCase.expected);
        });
      });
    });

    describe('when status is 0', () => {
      testCases = [
        {
          type: 3,
          expected: 'Running'
        },
        {
          type: 0,
          expected: 'Accessible'
        },
        {
          type: 16,
          expected: 'Accessible'
        }
      ];

      beforeEach(() => {
        service.status.status = 0;
      });

      _.each(testCases, (testCase) => {
        describe('and service type is ' + testCase.type, () => {
          beforeEach(() => {
            service.type = testCase.type;
          });

          it('returns "' + testCase.expected + '"', () => {
            expect(controller.getServiceStatus()).toBe(testCase.expected);
          });
        });
      });
    });
  });

  describe('getMonitorStatus', () => {
    let testCases = [
      {
        monitorStatus: 0,
        expected: 'Not monitored'
      },
      {
        monitorStatus: 2,
        expected: 'Initializing'
      }
    ];

    _.each(testCases, (testCase) => {
      describe('when monitor status is ' + testCase.monitorStatus, () => {
        beforeEach(() => {
          service.status.monitor = testCase.monitorStatus;
        });

        it('returns "' + testCase.expected + '"', () => {
          expect(controller.getMonitorStatus()).toBe(testCase.expected);
        });
      });
    });

    describe('when monitor status is 1', () => {
      testCases = [
        {
          pendingaction: 6,
          expected: 'start pending'
        },
        {
          pendingaction: 2,
          expected: 'restart pending'
        },
        {
          pendingaction: 3,
          expected: 'stop pending'
        }
      ];

      _.each(testCases, (testCase) => {
        describe('and pendingaction is ' + testCase.pendingaction, () => {
          beforeEach(() => {
            service.status.pendingaction = testCase.pendingaction;
          });

          it('returns "' + testCase.expected + '"', () => {
            expect(controller.getMonitorStatus()).toBe(testCase.expected);
          });
        });
      });
    });
  });
});
