import template from './list.template.html!text';
import ListServersCtrl from './list.ctrl';

export default angular
  .module('app.servers.list', [])
  .controller(ListServersCtrl.name, ListServersCtrl)
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.servers.list', {
        url: '',
        template: template,
        controller: ListServersCtrl.name,
        controllerAs: 'ctrl'
      });
  }]);
