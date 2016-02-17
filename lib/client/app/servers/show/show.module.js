import template from './show.template.html!text';
import ShowServerCtrl from './show.ctrl';

export default angular
  .module('app.servers.show', [])
  .controller(ShowServerCtrl.name, ShowServerCtrl)
  .config(['$stateProvider', ($stateProvider) => {
    $stateProvider
      .state('app.servers.show', {
        url: '/:hostname',
        template: template,
        controller: ShowServerCtrl.name,
        controllerAs: 'ctrl'
      });
  }]);
