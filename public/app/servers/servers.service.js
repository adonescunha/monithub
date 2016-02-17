class Servers {

  constructor($http) {
    this.$http = $http;
    this.current = null;
  }

  get(hostname) {
    var self = this;
    return this.$http.get('/server/' + hostname)
      .then((response) => {
        self.current = response.data;
        return response.data;
      });
  }

  list() {
    return this.$http.get('/servers')
      .then((response) => {
        return response.data;
      });
  }

  create(data) {
    return this.$http.post('/servers', data)
      .then((response) => {
        return response.data;
      });
  }

  sync(hostname) {
    return this.$http.post('/server/' + hostname + '/syncs')
      .then((response) => {
        return response.data;
      });
  }
}

Servers.$inject = ['$http'];

export default Servers;
