class Servers {

  constructor($http, $cookies) {
    this.$http = $http;
    this.$cookies = $cookies;
    this.current = null;
  }

  get(hostname) {
    return this.$http.get('/server/' + hostname)
      .then((response) => {
        this.current = response.data;
        this.$cookies.put('current-server', hostname);
        return response.data;
      });
  }

  delete(hostname) {
    return this.$http.delete('/server/' + hostname)
      .then((response) => {
        this.$cookies.remove('current-server');
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

Servers.$inject = ['$http', '$cookies'];

export default Servers;
