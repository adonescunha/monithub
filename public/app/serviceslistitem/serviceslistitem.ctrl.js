class ServicesListItemCtrl {
  constructor($scope) {
    this.$scope = $scope;
  }

  $onInit() {
    this.init();
  }

  init() {
    this.service = this.$scope.$parent.service;
    this.status = this.service.statuses[0];
  }
}

ServicesListItemCtrl.$inject = ['$scope'];

export default ServicesListItemCtrl;
