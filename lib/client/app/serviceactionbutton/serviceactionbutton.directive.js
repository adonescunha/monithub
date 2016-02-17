import template from './serviceactionbutton.template.html!text';
import ServiceActionButtonCtrl from './serviceactionbutton.ctrl';

function directive() {
  return {
    restrict: "E",
    replace: true,
    template: template,
    scope: {},
    bindToController: {
      service: '=',
      iconCssClass: '@',
      actionName: '@',
      actionDescription: '@'
    },
    controller: ServiceActionButtonCtrl,
    controllerAs: 'ctrl'
  };
}

directive.$inject = [];

export default directive;
