class NewServerCtrl {

  constructor($state, snackbar, Servers) {
    this.$state = $state;
    this.snackbar = snackbar;
    this.Servers = Servers;
    this.init();
  }

  init() {
    this.server = {};
  }

  createServer() {
    let self = this;
    this.Servers
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

NewServerCtrl.$inject = ['$state', 'snackbar', 'Servers'];

export default NewServerCtrl;
