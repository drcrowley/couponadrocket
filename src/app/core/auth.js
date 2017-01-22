angular
  .module('app.core')
	.config(routeConfig)
	.controller('Auth', Auth)
  .factory('auth', auth);

routeConfig.$inject = ['$routeProvider'];

function routeConfig($routeProvider) {
  $routeProvider.when('/auth', {
  	controller: 'Auth',
  	controllerAs: 'vm',
  	title: 'Авторизация',
  	template: ''
  });
}


Auth.$inject = ['$location', '$window', 'auth'];

function Auth($location, $window, auth) {
	
	var token = $location.search().token;
	if (token) {
		auth.set(token);
	}
	$window.location.href = '/';
}

auth.$inject = ['localStorageService'];

function auth(localStorageService) {

  var service = {
    get: get,
    set: set
  };

  return service;	


  function set(token) {
  	localStorageService.set('token', token);
  }

	function get() {
		var token = localStorageService.get('token');

		if (token) {
			return token;
		}
	}
}