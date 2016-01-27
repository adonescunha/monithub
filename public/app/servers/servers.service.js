class ServerService {

  constructor($http) {
    this.$http = $http;
  }

  create(data) {
    return this.$http.post('/services', data);
  }
};

ServerService.$inject = ['$http'];

export default ServerService;
