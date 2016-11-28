(function() {
  'use strict';

  angular
    .module('app.balance')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider
        .when('/balance', { 
          templateUrl: 'app/balance/balance.html', 
          controller: 'Balance',
          controllerAs: 'vm',          
          title: 'Пополнить баланс'
        });
    }

})();