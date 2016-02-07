class ShowServerCtrl {
  constructor($stateParams, Servers) {
    this.$stateParams = $stateParams;
    this.servers = Servers;
    this.init();
  }

  init() {
    this.servers
      .get(this.$stateParams.hostname)
      .then((server) => {
        this.server = server;
      });
  }
}

ShowServerCtrl.$inject = ['$stateParams', 'Servers'];

export default ShowServerCtrl;
