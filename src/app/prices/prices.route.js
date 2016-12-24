(function() {
  'use strict';

  angular
    .module('app.prices')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider
        .when('/prices', { 
          templateUrl: 'app/prices/prices.html', 
          controller: 'Prices',
          controllerAs: 'vm',          
          title: 'Тарифы'
        });
    }

})();