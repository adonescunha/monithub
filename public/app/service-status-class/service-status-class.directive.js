let getStatusCssClass = (service) => {
  if (service.status.monitor === 0) {
    return 'text-gray';
  } else if (_.includes([2, 16], service.status.status)) {
    return 'text-red';
  }

  return 'text-green';
};

export default () => {
  return {
    restrict: "A",
    link: (scope, elem, attrs) => {
      scope.$watch(attrs.serviceStatusClass, (value) => {
        if (value !== undefined) {
          elem.addClass(getStatusCssClass(value));
        }
      });
    }
  };
};
