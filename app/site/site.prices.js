(function() {
  'use strict';

  angular
    .module('app.site')
    .controller('Prices', Prices);

    Prices.$inject = [];
    
    function Prices() {
      var vm = this;

      vm.periods = [
        {
          month: 1,
          salePercent: 0
        },
        {
          month: 3,
          salePercent: 10
        },
        {
          month: 6,
          salePercent: 20
        },
        {
          month: 12,
          salePercent: 30          
        }
      ];

      vm.price = {

      }

      vm.choosePeriod = function() {

      }

      vm.chooseTariff = function() {

      }

    }
})();