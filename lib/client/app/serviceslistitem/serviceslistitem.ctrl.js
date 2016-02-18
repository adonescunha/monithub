class ServicesListItemCtrl {
  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
  }

  $onInit() {
    this.init();
  }

  init() {
    this.service = this.$scope.$parent.service;
    this.status = this.service.status;
  }
}

ServicesListItemCtrl.$inject = ['$scope', '$http'];

export default ServicesListItemCtrl;
