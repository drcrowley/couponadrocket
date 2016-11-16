(function() {
  'use strict';

  angular
    .module('app.home')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider
        .when('/', { 
          templateUrl: 'app/home/home.html', 
          controller: 'Home',
          controllerAs: 'vm',          
          title: 'Главная'
        });
    }

})();