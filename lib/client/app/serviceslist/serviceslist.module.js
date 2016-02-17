import directive from './serviceslist.directive';
import Services from '../services/services.service';

export default angular
  .module('serviceslist', [])
  .directive('serviceslist', directive)
  .service(Services.name, Services);
