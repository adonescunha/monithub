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

  getStatusCssClass() {
    if (this.status.monitor === 0) {
      return 'text-gray';
    } else if (_.includes([2, 16], this.status.status)) {
      return 'text-red';
    }

    return 'text-green';
  }
}

ServicesListItemCtrl.$inject = ['$scope'];

export default ServicesListItemCtrl;
