class ServiceDetailCtrl {
  constructor($scope, $state, Servers, snackbar) {
    this.$scope = $scope;
    this.$state = $state;
    this.servers = Servers;
    this.snackbar = snackbar;
  }

  $onInit() {
    this.$scope.$watch('ctrl.server', (value) => {
      if (value !== undefined) {
        this.init();
      }
    });

    this.$scope.$watch('ctrl.services', (value) => {
      if (value !== undefined) {
        this.systemStatus = _.find(this.services, {
          type: 5
        }).status.system;
      }
    });
  }

  init() {
    if (this.server.localhostname === undefined) {
      this.sync();
    }
  }

  sync() {
    this.servers
      .sync(this.server.hostname)
      .catch((err) => {
        throw err;
      });
  }

  delete() {
    return this.servers
      .delete(this.server.hostname)
      .then((data) => {
        this.$state.go('app');
        this.snackbar.create(data.message, 5000);
      })
      .catch((err) => {
        throw err;
      });
  }
}

ServiceDetailCtrl.$inject = ['$scope', '$state', 'Servers', 'snackbar'];

export default ServiceDetailCtrl;
