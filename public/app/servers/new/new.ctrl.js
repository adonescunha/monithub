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
      }, () => {
        self.logError();
      });
  }

  logError() {
    console.log('ERROR');
  }
}

NewServerCtrl.$inject = ['ServerService'];

export default NewServerCtrl;
