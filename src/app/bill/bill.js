(function() {
  'use strict';

  angular
    .module('app.bill')
    .controller('Bill', Bill);

    Bill.$inject = ['$location', 'dataservice'];
    
    function Bill($location, dataservice) {
      var vm = this;
      activate();

      vm.orderData = dataservice.getOrderData();

      // if (!vm.orderData) {
      //   $location.path('/site/1/2');
      // }

      console.log(vm.orderData);

      function activate() {

      }
    }
})();