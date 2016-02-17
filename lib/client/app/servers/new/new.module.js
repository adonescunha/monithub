import template from './new.template.html!text';
import NewServerCtrl from './new.ctrl';

export default angular
  .module('app.servers.new', [])
  .controller(NewServerCtrl.name, NewServerCtrl)
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.servers.new', {
        url: '/new',
        template: template,
        controller: NewServerCtrl.name,
        controllerAs: 'ctrl'
      });
  }]);
