import './vendor';

import NavigationModule from './navigation/navigation.module';
import ServicesListModule from './serviceslist/serviceslist.module';
import ServicesListItemModule from './serviceslistitem/serviceslistitem.module';
import ServiceActionButtonModule from './serviceactionbutton/serviceactionbutton.module';
import ServiceStatusClassModule from './service-status-class/service-status-class.module';
import ServiceStatusModule from './servicestatus/servicestatus.module';
import ServerStatusClassModule from './server-status-class/server-status-class.module';
import ServerDetailModule from './serverdetail/serverdetail.module';
import ServersListModule from './serverslist/serverslist.module';
import ServersListItemModule from './serverslistitem/serverslistitem.module';
import ServersModule from './servers/servers.module';
import ServicesModule from './services/services.module';
import bytes from './bytes';
import Socket from './socket';
import template from './main.template.html!text';

export default angular.module('app', [
  'ui.router',
  'angular.snackbar',
  'angularMoment',
  'ngCookies',
  NavigationModule.name,
  ServicesListModule.name,
  ServicesListItemModule.name,
  ServiceActionButtonModule.name,
  ServiceStatusClassModule.name,
  ServiceStatusModule.name,
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
        url: '',
        template: template
      });
  }])
  .service(Socket.name, Socket)
  .filter('bytes', bytes);
