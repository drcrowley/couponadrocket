angular
  .module('app.services')
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


Auth.$inject = ['$rootScope', '$location', '$window', 'auth'];

function Auth($rootScope, $location, $window, auth) {
  $rootScope.isLoading = true;
	
	var token = $location.search().token;
	if (token) {
		auth.set(token);
	}
  $location.path('#/site/0/coupon');
}

auth.$inject = ['$http', '$window', 'localStorageService'];

function auth($http, $window, localStorageService) {

  var service = {
    get: get,
    set: set,
    remove: remove
  };

  return service;	


  function set(token) {
    $http.defaults.headers.common.Authorization = token;
  	localStorageService.set('token', token);
  }

	function get() {
		var token = localStorageService.get('token');

		if (token) {
			return token;
		}
	}

  function remove() {
    localStorageService.remove('token');
    delete $http.defaults.headers.common.Authorization;
    $window.location.href = '/';
  }
}