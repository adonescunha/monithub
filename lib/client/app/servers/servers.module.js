import template from './servers.template.html!text';
import Servers from './servers.service';
import ShowModule from './show/show.module';
import NewModule from './new/new.module';

export default angular
  .module('app.servers', [
    ShowModule.name,
    NewModule.name
  ])
  .service(Servers.name, ['$http', '$cookies', Servers])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.servers', {
        url: '/servers',
        abstract: true,
        template: template
      });
  }]);
