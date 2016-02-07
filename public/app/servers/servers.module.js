import template from './servers.template.html!text';
import Servers from './servers.service';
import ShowModule from './show/show.module';
import NewModule from './new/new.module';
import ListModule from './list/list.module';

export default angular
  .module('app.servers', [
    ShowModule.name,
    ListModule.name,
    NewModule.name
  ])
  .service(Servers.name, ['$http', Servers])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.servers', {
        url: '/servers',
        abstract: true,
        template: template
      });
  }]);
