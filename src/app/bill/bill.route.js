(function() {
  'use strict';

  angular
    .module('app.bill')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider
        .when('/bill', { 
          templateUrl: 'app/bill/bill.html', 
          controller: 'Bill',
          controllerAs: 'vm',          
          title: 'Выставить счет'
        });
    }

})();