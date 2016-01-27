class ServerService {

  constructor($http) {
    this.$http = $http;
  }

  create(data) {
    let self = this;

    return this.$http.post('/services', data)
      .then((response) => {
        return response.data;
      });
  }
};

ServerService.$inject = ['$http'];

export default ServerService;
