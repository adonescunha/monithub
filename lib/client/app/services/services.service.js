class Services {
  constructor($http) {
    this.$http = $http;
  }

  list(hostname) {
    return this.$http
      .get('/server/' + hostname + '/services')
      .then((response) => {
        return response.data;
      });
  }
}

Services.$inject = ['$http'];

export default Services;
