import 'app/main';

describe('MainCtrl', () => {
  let controller
    , state
    , cookies
    , hostname = 'monit.myapp.com';

  beforeEach(() => {
    module('app');

    inject(($injector, $cookies, $controller) => {
      cookies = $cookies;
      state = $injector.get('$state');
      $cookies.put('current-server', hostname);
      spyOn(state, 'go');
      controller = $controller('MainCtrl', {
        $state: state,
        $cookies: cookies
      });
    });
  });

  describe('init', () => {
    describe('when current-server is present on cookie', () => {
      it('redirects to app.servers.show', () => {
        expect(state.go)
          .toHaveBeenCalledWith('app.servers.show', {
            hostname: hostname
          });
      });
    });
  });
});
