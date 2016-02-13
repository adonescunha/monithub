class ServersListItemCtrl {
  constructor($scope, Socket) {
    this.$scope = $scope;
    this.socket = Socket;
  }

  $onInit() {
    this.$scope.$watch('ctrl.server', (value) => {
      if (value !== undefined) {
        this.init();
      }
    });
  }

  init() {
    this.socket.on('server-' + this.server._id + 'refreshed', (data) => {
      this.server = data.server;
      this.$scope.$digest();
    });
  }
}

ServersListItemCtrl.$inject = ['$scope', 'Socket'];

export default ServersListItemCtrl;
