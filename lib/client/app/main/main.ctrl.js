class MainCtrl {
  constructor($state, $cookies) {
    this.$state = $state;
    this.$cookies = $cookies;
    this.init();
  }

  init() {
    let hostname = this.$cookies.get('current-server');

    if (hostname !== undefined) {
      this.$state.go('app.servers.show', {
        hostname: hostname
      });
    }
  }
}

MainCtrl.$inject = ['$state', '$cookies'];

export default MainCtrl;
