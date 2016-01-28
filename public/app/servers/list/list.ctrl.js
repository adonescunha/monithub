class ListServersCtrl {

  constructor(ServerService) {
    this.ServerService = ServerService;
    this.init();
  }

  init() {
    let self = this;
    this.servers = [];

    this.ServerService.list()
      .then((servers) => {
        self.servers = servers;
      });
  }
}

ListServersCtrl.$inject = ['ServerService'];

export default ListServersCtrl;
