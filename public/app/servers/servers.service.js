class ServerService {

  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  create(data) {
    let self = this;

    return this.$http.post('/services', data)
      .then((response) => {
        if (response.status == 200) {
          return response.data;
        } else {
          return self.$q.reject(response.data);
        }
      });
  }
};

ServerService.$inject = ['$http', '$q'];

export default ServerService;
