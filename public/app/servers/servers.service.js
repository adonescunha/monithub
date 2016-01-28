class ServerService {

  constructor($http) {
    this.$http = $http;
  }

  list() {
    let self = this;

    return this.$http.get('/servers')
      .then((response) => {
        return response.data;
      });
  }

  create(data) {
    let self = this;

    return this.$http.post('/servers', data)
      .then((response) => {
        return response.data;
      });
  }
};

ServerService.$inject = ['$http'];

export default ServerService;
