class ShowServerCtrl {
  constructor($scope, $stateParams, Servers, Services, Socket) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.servers = Servers;
    this.services = Services;
    this.socket = Socket;
    this.init();
  }

  init() {
    this.getServer()
      .then(() => {
        this.socket.on('server-' + this.$scope.server._id + 'refreshed', (data) => {
          this.$scope.server = data.server;
          this.getServices()
            .then(() => {
              if (this.$scope.$$phase != '$digest') {
                this.$scope.$digest();
              }
            })
            .catch((err) => {
              throw err;
            });
        });
      });
  }

  getServer() {
    return this.servers
      .get(this.$stateParams.hostname)
      .then((server) => {
        this.$scope.server = server;
        return this.getServices();
      })
      .catch((err) => {
        throw err;
      });
  }

  getServices() {
    return this.services
      .list(this.$scope.server.hostname)
      .then((services) => {
        this.$scope.services = services;
      })
      .catch((err) => {
        throw err;
      });
  }
}

ShowServerCtrl.$inject = [
  '$scope',
  '$stateParams',
  'Servers',
  'Services',
  'Socket'
];

export default ShowServerCtrl;
