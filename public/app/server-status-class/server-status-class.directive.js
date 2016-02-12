let getStatusCssClass = (services) => {
  var cssClass = 'box-success';

  _.each(services, (service) => {
    if (service.status.monitor === 0 && cssClass != 'text-red') {
      cssClass = 'box-default';
    } else if (_.includes([2, 16], service.status.status)) {
      cssClass = 'box-danger';
    }
  });

  return cssClass;
};

export default () => {
  return {
    restrict: "A",
    link: (scope, elem, attrs) => {
      scope.$watch(attrs.serverStatusClass, (value) => {
        if (value !== undefined) {
          elem.addClass(getStatusCssClass(value));
        }
      });
    }
  };
};
