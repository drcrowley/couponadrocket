(function() {
  'use strict';

  angular
    .module('app.site')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider      
        .when('/sites/:id', { 
          templateUrl: 'app/site/site.html', 
          controller: 'Site',
          controllerAs: 'vm',          
          title: 'Мои сайты'
        });
    }

})();