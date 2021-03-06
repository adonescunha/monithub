import template from './serviceslistitem.template.html!text';
import ServicesListItemCtrl from './serviceslistitem.ctrl';

function directive() {
  return {
    restrict: "A",
    template: template,
    scope: {},
    bindToController: {
      type: '=',
      server: '='
    },
    controller: ServicesListItemCtrl,
    controllerAs: 'ctrl'
  };
}

directive.$inject = [];

export default directive;
