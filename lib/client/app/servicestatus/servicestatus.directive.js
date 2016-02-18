import template from './servicestatus.template.html!text';
import ServiceStatusCtrl from './servicestatus.ctrl';

function directive() {
  return {
    restrict: "E",
    replace: true,
    template: template,
    scope: {},
    bindToController: {
      service: '='
    },
    controller: ServiceStatusCtrl,
    controllerAs: 'ctrl'
  };
}

directive.$inject = [];

export default directive;
