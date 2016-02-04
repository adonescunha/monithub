export default class Wait {
  constructor(Socket, $http, $timeout) {
    this.Socket = Socket;
    this.$http = $http;
    this.$timeout = $timeout;
    this.init();
  }

  init() {
    let self = this;

    this.Socket.on('finished', (data) => {
      console.log(data.message);
    });

    self.$http.get('/wait');
  }
}

Wait.$inject = ['Socket', '$http', '$timeout'];
