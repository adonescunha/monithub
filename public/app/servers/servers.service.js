class Servers {

  constructor($http) {
    this.$http = $http;
  }

  get(hostname) {
    return this.$http.get('/server/' + hostname)
      .then((response) => {
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
