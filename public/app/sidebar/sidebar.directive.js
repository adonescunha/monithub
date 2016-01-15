import template from './sidebar.html!text';

function directive() {
  return {
    restrict: "E",
    replace: true,
    scope: true,
    template: template,
    bindToController: true,
    controllerAs: "ctrl"
  }
};

directive.$inject = [];

export default directive;
