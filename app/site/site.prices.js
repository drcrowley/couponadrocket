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
          salePercent: 0,
          class: 'default'
        },
        {
          month: 3,
          salePercent: 10,
          class: 'warning'
        },
        {
          month: 6,
          salePercent: 20,
          class: 'success'
        },
        {
          month: 12,
          salePercent: 30,
          class: 'danger'
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