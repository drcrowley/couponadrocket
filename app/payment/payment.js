(function() {
  'use strict';

  angular
    .module('app.payment')
    .controller('Payment', Payment);

    Payment.$inject = ['$location', 'dataservice'];
    
    function Payment($location, dataservice) {
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