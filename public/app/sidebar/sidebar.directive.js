import template from './sidebar.template.html!text';
import SidebarCtrl from './sidebar.ctrl';

function directive() {
  return {
    restrict: "E",
    replace: true,
    scope: true,
    template: template,
    bindToController: true,
    controllerAs: "ctrl",
    controller: SidebarCtrl
  }
};

directive.$inject = [];

export default directive;
