import template from './servers.template.html!text';
import ServerService from './servers.service';
import NewModule from './new/new.module';

export default angular
  .module('app.servers', [NewModule.name])
  .service(ServerService.name, ['$http', '$q', ServerService])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.servers', {
        url: '/servers',
        abstract: true,
        template: template
      });
  }])
