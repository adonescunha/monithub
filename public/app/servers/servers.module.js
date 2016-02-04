import template from './servers.template.html!text';
import ServerService from './servers.service';
import NewModule from './new/new.module';
import ListModule from './list/list.module';

export default angular
  .module('app.servers', [
    ListModule.name,
    NewModule.name
  ])
  .service(ServerService.name, ['$http', ServerService])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.servers', {
        url: '/servers',
        abstract: true,
        template: template
      });
  }]);
