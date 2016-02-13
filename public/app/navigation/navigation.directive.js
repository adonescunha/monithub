import template from './navigation.template.html!text';

function directive() {
  return {
    restrict: "E",
    replace: true,
    template: template,
  };
}

directive.$inject = [];

export default directive;
