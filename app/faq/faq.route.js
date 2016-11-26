(function() {
  'use strict';

  angular
    .module('app.faq')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider
        .when('/faq', { 
          templateUrl: 'app/faq/faq.html', 
          controller: 'Faq',
          controllerAs: 'vm',          
          title: 'Faq'
        });
    }

})();