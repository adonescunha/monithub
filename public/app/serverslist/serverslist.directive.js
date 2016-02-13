import template from './serverslist.template.html!text';
import ServersListCtrl from './serverslist.ctrl';

function directive() {
  return {
    restrict: "E",
    replace: true,
    template: template,
    controller: ServersListCtrl,
    controllerAs: 'ctrl'
  };
}

directive.$inject = [];

export default directive;
