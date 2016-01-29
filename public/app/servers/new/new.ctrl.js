class NewServerCtrl {

  constructor($state, snackbar, ServerService) {
    this.$state = $state;
    this.snackbar = snackbar;
    this.ServerService = ServerService;
    this.init();
  }

  init() {
    this.server = {};
  }

  createServer() {
    let self = this;
    this.ServerService
      .create(this.server)
      .then(() => {
        self.init();
        self.$state.go('app.servers.list');
        self.snackbar.create('Server successfully added.', 5000);
      }, () => {
        self.logError();
      });
  }

  logError() {
    console.log('ERROR');
  }
}

NewServerCtrl.$inject = ['$state', 'snackbar', 'ServerService'];

export default NewServerCtrl;
