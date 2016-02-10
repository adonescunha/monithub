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
    this.Servers
      .create(this.server)
      .then(() => {
        this.$state.go('app.servers.show', {
          hostname: this.server.hostname
        });
        this.Servers.sync(this.server.hostname);
        this.snackbar.create('Server successfully added.', 5000);
      }, () => {
        this.logError();
      });
  }

  logError() {
    console.log('ERROR');
  }
}

NewServerCtrl.$inject = ['$state', 'snackbar', 'Servers'];

export default NewServerCtrl;
