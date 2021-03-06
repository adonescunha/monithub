class ServersListCtrl {
  constructor($scope, Servers, Socket) {
    this.$scope = $scope;
    this.Servers = Servers;
    this.socket = Socket;
    this.init();
  }

  init() {
    this.servers = [];
    this.Servers.list()
      .then((servers) => {
        this.servers = servers;
        this.socket.on('server-created', (data) => {
          this.servers.push(data.server);

          if (this.$scope.$$phase != '$digest') {
            this.$scope.$digest();
          }
        });
        this.socket.on('server-removed', (data) => {
          _.remove(this.servers, (server) => {
            return server.hostname == data.server.hostname;
          });

          if (this.$scope.$$phase != '$digest') {
            this.$scope.$digest();
          }
        });
      });
  }
}

ServersListCtrl.$inject = ['$scope', 'Servers', 'Socket'];

export default ServersListCtrl;
