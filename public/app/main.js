import './vendor'

import SidebarModule from './sidebar/sidebar.module';
// import ServerFormModule from './server-form/server-form.module';
import ServersModule from './servers/servers.module';

export default angular.module('app', [
  'ui.router',
  SidebarModule.name,
  // ServerFormModule.name,
  ServersModule.name,
]).config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      template: '<div ui-view></div>'
    });
}]);
