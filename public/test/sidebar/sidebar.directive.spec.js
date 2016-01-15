import {module} from 'angular-mocks';
import SidebarModule from 'app/sidebar/sidebar.module';

let compile, scope, directiveElem;

describe('sidebarDirective', () => {
  beforeEach(() => {
    module('Sidebar');

    inject(($compile, $rootScope) => {
      compile = $compile;
      scope = $rootScope;
    });

    directiveElem = getCompiledElement();
  });

  it('should have sction element', () => {
    var sectionElement = directiveElem.find('section.sidebar');
    expect(sectionElement).toBeDefined();
  });
});

function getCompiledElement() {
  var element = angular.element('<sidebar></sidebar>');
  var compiledElement = compile(element)(scope);
  scope.$digest();
  return compiledElement;
};
