class ListServersCtrl {

  constructor(ServerService) {
    this.ServerService = ServerService;
    this.init();
  }

  init() {
    this.servers = [];
  }
}

ListServersCtrl.$inject = ['ServerService'];

export default ListServersCtrl;
