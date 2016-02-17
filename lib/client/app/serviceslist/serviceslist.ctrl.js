class ServicesListCtrl {
  constructor($scope) {
    this.$scope = $scope;
  }

  $onInit() {
    this.$scope.$watch('ctrl.services', (value) => {
      if (value !== undefined) {
        this.init();
      }
    });
  }

  init() {
    this.types = _.groupBy(this.services, "type");

    if (5 in this.types) {
      delete this.types[5];
    }
  }
}

ServicesListCtrl.$inject = ['$scope'];

export default ServicesListCtrl;
