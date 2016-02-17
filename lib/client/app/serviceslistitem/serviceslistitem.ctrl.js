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

  action(name) {
    this.$http
      .post('/server/' + this.server.hostname + '/service/' + this.service.name + '/actions', {
        name: name
      })
      .then((response) => {
        console.log(name + ' pending');
      })
      .catch((err) => {
        throw err;
      });
  }
}

ServicesListItemCtrl.$inject = ['$scope', '$http'];

export default ServicesListItemCtrl;
