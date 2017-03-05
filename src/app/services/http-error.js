(function() {
  'use strict';

  angular.module('app.services')
    .factory('httpErrorInterceptor', httpErrorInterceptor)
    .config(httpErrorConfig);

    httpErrorInterceptor.$inject = ['$q', '$location', '$window', 'config'];

    function httpErrorInterceptor($q, $location, $window, config) {
      return {
        'responseError': function(rejection) {
          console.log(rejection);
          // permission denied, better login!
          if(rejection.status === 403) {
            $window.location.href = config.loginUrl;
          }
          $q.reject(rejection);
        }
      };
    }

    httpErrorConfig.$inject = ['$httpProvider'];

    function httpErrorConfig($httpProvider) {
      $httpProvider.interceptors.push('httpErrorInterceptor')
    }
    
})();
