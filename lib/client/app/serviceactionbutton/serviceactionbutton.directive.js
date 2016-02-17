import template from './serviceactionbutton.template.html!text';
import ServiceActionButtonCtrl from './serviceactionbutton.ctrl';

function directive() {
  return {
    restrict: "A",
    template: template,
    scope: {},
    bindToController: {
      iconCssClass: '=',
      service: '='
    },
    controller: ServiceActionButtonCtrl,
    controllerAs: 'ctrl'
  };
}

directive.$inject = [];

export default directive;
