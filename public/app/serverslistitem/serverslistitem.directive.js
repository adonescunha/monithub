import template from './serverslistitem.template.html!text';
import ServersListItemCtrl from './serverslistitem.ctrl.js';

function directive() {
  return {
    restrict: "E",
    replace: true,
    scope: {},
    bindToController: {
      server: "="
    },
    controller: ServersListItemCtrl,
    controllerAs: 'ctrl',
    template: template
  };
}

directive.$inject = [];

export default directive;
