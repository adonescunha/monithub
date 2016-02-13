class ServersListCtrl {

  constructor(Servers) {
    this.Servers = Servers;
    this.init();
  }

  init() {
    this.servers = [];
    this.Servers.list()
      .then((servers) => {
        this.servers = servers;
      });
  }
}

ServersListCtrl.$inject = ['Servers'];

export default ServersListCtrl;
