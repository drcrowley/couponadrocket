(function() {
  'use strict';

  angular
    .module('app.payment')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider
        .when('/payment', { 
          templateUrl: 'app/payment/payment.html', 
          controller: 'Payment',
          controllerAs: 'vm',          
          title: 'Оплата'
        });
    }

})();