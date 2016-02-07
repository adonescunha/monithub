class ServicesListCtrl {
  constructor(Services) {
    this.Services = Services;
  }

  init(hostname) {
    this.Services
      .list(hostname)
      .then((services) => {
        this.services = services;
        this.types = _.groupBy(this.services, "type");
      })
      .catch((err) => {
        throw err;
      });
  }
}

ServicesListCtrl.$inject = ['Services'];

export default ServicesListCtrl;
