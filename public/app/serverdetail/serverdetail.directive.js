import template from './serverdetail.template.html!text';
import ServerDetailCtrl from './serverdetail.ctrl';

function directive() {
  return {
    restrict: "E",
    replace: true,
    template: template,
    scope: {},
    bindToController: {
      server: '=',
      services: '='
    },
    controller: ServerDetailCtrl,
    controllerAs: 'ctrl'
  };
}

directive.$inject = [];

export default directive;
