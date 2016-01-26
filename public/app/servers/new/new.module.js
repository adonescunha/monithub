import template from './new.template.html!text';

export default angular
  .module('app.server-form', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app.servers.new', {
        url: '/new',
        template: template
      });
  }]);
