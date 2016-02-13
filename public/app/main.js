import './vendor';

import SidebarModule from './sidebar/sidebar.module';
import ServicesListModule from './serviceslist/serviceslist.module';
import ServicesListItemModule from './serviceslistitem/serviceslistitem.module';
import ServiceStatusClassModule from './service-status-class/service-status-class.module';
import ServerStatusClassModule from './server-status-class/server-status-class.module';
import ServerDetailModule from './serverdetail/serverdetail.module';
import ServersListModule from './serverslist/serverslist.module';
import ServersListItemModule from './serverslistitem/serverslistitem.module';
import ServersModule from './servers/servers.module';
import ServicesModule from './services/services.module';
import bytes from './bytes';
import Socket from './socket';

export default angular.module('app', [
  'ui.router',
  'angular.snackbar',
  'angularMoment',
  SidebarModule.name,
  ServicesListModule.name,
  ServicesListItemModule.name,
  ServiceStatusClassModule.name,
  ServerStatusClassModule.name,
  ServerDetailModule.name,
  ServersListModule.name,
  ServersListItemModule.name,
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
