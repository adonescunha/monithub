class NewServerCtrl {

  constructor(ServerService) {
    this.ServerService = ServerService;
    this.init();
  }

  init() {
    this.server = {};
  }

  createServer() {
    var self = this;
    this.ServerService
      .create(this.server)
      .then(() => {
        self.init();
      });
  }
}

NewServerCtrl.$inject = ['ServerService'];

export default NewServerCtrl;
