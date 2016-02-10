class ServicesListCtrl {
  constructor($scope, Services) {
    this.$scope = $scope;
    this.Services = Services;
  }

  $onInit() {
    this.$scope.$watch('ctrl.server', (value) => {
      if (value !== undefined) {
        this.init();
      }
    });
  }

  init() {
    this.Services
      .list(this.server.hostname)
      .then((services) => {
        this.services = services;
        this.types = _.groupBy(this.services, "type");
      })
      .catch((err) => {
        throw err;
      });
  }
}

ServicesListCtrl.$inject = ['$scope', 'Services'];

export default ServicesListCtrl;
