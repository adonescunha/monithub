class ServiceActionButtonCtrl {
  constructor($http, Servers) {
    this.$http = $http;
    this.servers = Servers;
  }

  handleClick() {
    var self = this;
    return this.$http
      .post(this.getActionsUrl(), {
        name: this.name
      })
      .then((response) => {
        console.log(self.name + ' pending');
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
