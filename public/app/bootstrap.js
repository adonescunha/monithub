import 'bootstrap/css/bootstrap.css!';
import 'almasaeed2010/AdminLTE/dist/css/AdminLTE.css!';
import 'almasaeed2010/AdminLTE/dist/css/skins/skin-blue.css!';
import 'font-awesome/css/font-awesome.css!';
import '/css/main.css!';

import mainModule from './main';

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainModule.name], { strictDi: true });
});
