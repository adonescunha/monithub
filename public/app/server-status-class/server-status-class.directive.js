let getStatusCssClass = (server) => {
  if (server.status > 0) {
    return 'box-danger';
  }

  return 'box-success';
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
