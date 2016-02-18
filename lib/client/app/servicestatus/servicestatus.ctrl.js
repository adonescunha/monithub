class ServiceStatusCtrl {
  getStatus() {
    let monitorStatus = this.getMonitorStatus()
      , serviceStatus;

    if (_.includes([0, 2], this.service.status.monitor)) {
      return monitorStatus;
    }

    serviceStatus = this.getServiceStatus();

    if (this.service.status.pendingaction > 0) {
      return serviceStatus + ' - ' + monitorStatus;
    }

    return serviceStatus;
  }

  getServiceStatus() {
    switch (this.service.status.status) {
      case 512:
        return 'Does not exist';
      case 16:
        return 'Size failed';
      case 2:
        return 'Resource limit matched';
      default:
        if (_.includes([0, 16], this.service.type)) {
          return 'Accessible';
        }

        return 'Running';
    }
  }

  getMonitorStatus() {
    switch (this.service.status.monitor) {
      case 0:
        return 'Not monitored';
      case 2:
        return 'Initializing';
      default:
        let action;

        switch (this.service.status.pendingaction) {
          case 2:
            action = 'restart';
            break;
          case 3:
            action = 'stop';
            break;
          default:
            action = 'start';
            break;
        }

        return action + ' pending';
    }
  }
}

ServiceStatusCtrl.$inject = [];

export default ServiceStatusCtrl;
