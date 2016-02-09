import './vendor';

import SidebarModule from './sidebar/sidebar.module';
import ServersModule from './servers/servers.module';
import ServerItemModule from './serveritem/serveritem.module';
import ServicesModule from './services/services.module';
import Socket from './socket';

export default angular.module('app', [
  'ui.router',
  'angular.snackbar',
  'angularMoment',
  SidebarModule.name,
  ServerItemModule.name,
  ServersModule.name,
  ServicesModule.name
])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        template: '<div ui-view></div>'
      });
  }])
  .service(Socket.name, Socket);
