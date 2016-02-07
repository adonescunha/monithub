class ListServersCtrl {

  constructor(Servers) {
    this.Servers = Servers;
    this.init();
  }

  init() {
    let self = this;
    this.servers = [];

    this.Servers.list()
      .then((servers) => {
        self.servers = servers;
      });
  }
}

ListServersCtrl.$inject = ['Servers'];

export default ListServersCtrl;
