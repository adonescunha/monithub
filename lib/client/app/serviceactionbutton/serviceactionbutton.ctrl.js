class ServiceActionButtonCtrl {
  constructor($http, Servers, snackbar) {
    this.$http = $http;
    this.servers = Servers;
    this.snackbar = snackbar;
  }

  handleClick() {
    var self = this;
    return this.$http
      .post(this.getActionsUrl(), {
        name: this.actionName
      })
      .then((response) => {
        this.snackbar.create(self.actionDescription + ' pending', 5000);
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

ServiceActionButtonCtrl.$inject = ['$http', 'Servers', 'snackbar'];

export default ServiceActionButtonCtrl;
