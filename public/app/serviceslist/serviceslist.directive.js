import template from './serviceslist.template.html!text';
import ServicesListCtrl from './serviceslist.ctrl';

function directive() {
  return {
    restrict: "E",
    replace: true,
    template: template,
    scope: {},
    bindToController: {
      server: '='
    },
    controller: ServicesListCtrl,
    controllerAs: 'ctrl'
  };
}

directive.$inject = [];

export default directive;
