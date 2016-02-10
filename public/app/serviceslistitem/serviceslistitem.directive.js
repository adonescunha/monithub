import template from './serviceslistitem.template.html!text';
import ServicesListItemCtrl from './serviceslistitem.ctrl';

function directive() {
  return {
    restrict: "A",
    template: template,
    scope: {},
    bindToController: {
      service: '@'
    },
    controller: ServicesListItemCtrl,
    controllerAs: 'ctrl'
  };
}

directive.$inject = [];

export default directive;
