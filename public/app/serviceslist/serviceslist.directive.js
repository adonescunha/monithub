import template from './serviceslist.template.html!text';
import ServicesListCtrl from './serviceslist.ctrl';

function directive() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      server: "="
    },
    template: '<div>{{server.hostname}} services</div>',
    bindToController: true,
    controller: ServicesListCtrl,
    controllerAs: 'ctrl'
  };
}

directive.$inject = [];

export default directive;
