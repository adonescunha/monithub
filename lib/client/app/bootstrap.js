import app from './main';

angular.element(document).ready(function() {
  angular.bootstrap(document, [app.name], { strictDi: true });
});
