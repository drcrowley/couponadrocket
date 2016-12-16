(function() {
  'use strict';

  angular
    .module('app.site')
    .controller('Prices', Prices);

    Prices.$inject = ['$location', 'dataservice'];
    
    function Prices($location, dataservice) {

      var vm = this;

      vm.periods = [
        {
          month: 1,
          discountPercent: 0,
          class: 'default'
        },
        {
          month: 3,
          discountPercent: 10,
          class: 'warning'
        },
        {
          month: 6,
          discountPercent: 20,
          class: 'success'
        },
        {
          month: 12,
          discountPercent: 30,
          class: 'danger'
        }
      ];

      vm.tariffs = [
        {
          title: 'Free',
          count: 5,
          price: 0,
          class: 'default'
        },
        {
          title: 'Econom',
          count: 50,
          price: 490,
          class: 'warning'
        },
        {
          title: 'Start',
          count: 150,
          price: 990,
          class: 'success'
        },
        {
          title: 'Standart',
          count: 400,
          price: 1990,
          class: 'info'
        },
        {
          title: 'Unlimited',
          count: 'unlimited',
          price: 4990,
          class: 'danger'
        }
      ];
        
      vm.choosedPeriod = vm.periods[0];
      vm.choosedTariff = vm.tariffs[0];

      calcDiscountPrice();
      calcTotalPrice();

      vm.choosePeriod = function(period) {
        vm.choosedPeriod = period;
        calcDiscountPrice();
        calcTotalPrice();
      }

      vm.chooseTariff = function(tariff) {
        vm.choosedTariff = tariff;
        calcTotalPrice();
      }

      vm.pay = function() {
        var orderData = {
          period: vm.choosedPeriod,
          tariff: vm.choosedTariff,
          totalPrice: vm.totalPrice
        };

        dataservice.setOrderData(orderData);

        $location.path('/payment');
      }

      function calcDiscountPrice() {
        vm.tariffs.forEach(function(tarif) {
          tarif.priceWithDiscount = tarif.price - tarif.price*vm.choosedPeriod.discountPercent/100;
        });
      }

      function calcTotalPrice() {
        vm.totalPrice = vm.choosedTariff.priceWithDiscount * vm.choosedPeriod.month;
      }

    }
})();