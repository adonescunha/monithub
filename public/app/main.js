import './vendor'

import SidebarModule from './sidebar/sidebar.module';
import ServersModule from './servers/servers.module';

export default angular.module('app', [
  'ui.router',
  'angular.snackbar',
  SidebarModule.name,
  ServersModule.name,
])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      template: '<div ui-view></div>'
    });
}]);
