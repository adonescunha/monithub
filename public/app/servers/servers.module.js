import template from './servers.template.html!text';
import NewModule from './new/new.module';

export default angular
  .module('app.servers', [NewModule.name])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.servers', {
        url: '/servers',
        abstract: true,
        template: template
      });
  }]);
