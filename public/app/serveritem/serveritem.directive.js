import template from './serveritem.template.html!text';

function directive() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      server: "="
    },
    template: template
  };
}

directive.$inject = [];

export default directive;
