import './vendor';

import SidebarModule from './sidebar/sidebar.module';
import ServicesListModule from './serviceslist/serviceslist.module';
import ServicesListItemModule from './serviceslistitem/serviceslistitem.module';
import ServersModule from './servers/servers.module';
import ServerItemModule from './serveritem/serveritem.module';
import ServicesModule from './services/services.module';
import bytes from './filters/bytes';
import Socket from './socket';

export default angular.module('app', [
  'ui.router',
  'angular.snackbar',
  'angularMoment',
  SidebarModule.name,
  ServicesListModule.name,
  ServicesListItemModule.name,
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
  .service(Socket.name, Socket)
  .filter('bytes', bytes);
