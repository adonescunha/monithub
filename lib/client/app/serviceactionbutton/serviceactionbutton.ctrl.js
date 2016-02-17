class ServiceActionButtonCtrl {
  constructor($scope, $http, Servers) {
    this.$scope = $scope;
    this.$http = $http;
    this.servers = Servers;
  }

  handleClick() {
    var self = this;
    return this.$http
      .post(this.getActionsUrl(), {
        name: this.actionName
      })
      .then((response) => {
        console.log(self.actionName + ' pending');
      })
      .catch((err) => {
        throw err;
      });
  }

  getActionsUrl() {
    return ['/server/' + this.servers.current.hostname,
            '/service/' + this.service.name,
            '/actions'].join('');
  }
}

ServiceActionButtonCtrl.$inject = ['$scope', '$http', 'Servers'];

export default ServiceActionButtonCtrl;
