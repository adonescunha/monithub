class ServiceDetailCtrl {
  constructor($scope, Servers) {
    this.$scope = $scope;
    this.servers = Servers;
  }

  $onInit() {
    this.$scope.$watch('ctrl.server', (value) => {
      if (value !== undefined) {
        this.init();
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
}

ServiceDetailCtrl.$inject = ['$scope', 'Servers'];

export default ServiceDetailCtrl;
