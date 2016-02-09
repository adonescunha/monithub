class ShowServerCtrl {
  constructor($scope, $stateParams, Servers, Socket) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.servers = Servers;
    this.socket = Socket;
    this.init();
  }

  init() {
    this.servers
      .get(this.$stateParams.hostname)
      .then((server) => {
        this.$scope.server = server;
        this.socket.on('server-refreshed', (data) => {
          this.$scope.server = data.server;
          this.$scope.$apply();
        });
      });
  }
}

ShowServerCtrl.$inject = ['$scope', '$stateParams', 'Servers', 'Socket'];

export default ShowServerCtrl;
