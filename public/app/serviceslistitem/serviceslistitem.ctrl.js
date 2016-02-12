class ServicesListItemCtrl {
  constructor($scope) {
    this.$scope = $scope;
  }

  $onInit() {
    this.init();
  }

  init() {
    this.service = this.$scope.$parent.service;
    this.status = this.service.status;
  }
}

ServicesListItemCtrl.$inject = ['$scope'];

export default ServicesListItemCtrl;
