(function() {
  'use strict';

  angular
    .module('app.stat')
    .controller('Stat', Stat);

    Stat.$inject = ['$rootScope', '$routeParams', '$location', 'translations', 'dataservice'];
    
    function Stat($rootScope, $routeParams, $location, translations, dataservice) {
      var vm = this;

      $rootScope.title = translations['C_HEAD_SITES'] + ' - ' + translations['C_HEAD_STAT'];

      activate();

      vm.datePopupEnd = false;
      vm.datePopupStart = false;
      vm.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: moment('1995-12-21'),
        startingDay: 1,
        showWeeks: false
      };
      vm.format = 'dd.MM.yyyy';

      // vm.stat = {
      //   labels: ['1995-12-21', '1995-12-22', '1995-12-23', '1995-12-25', '1995-12-26', '1995-12-27'],
      //   series: ['Показ купона', 'Посещаемость', 'Продажа купона'],
      //   data: [
      //           [65, 59, 80, 81, 56, 55, 40],
      //           [28, 48, 40, 19, 86, 27, 90],
      //           [10, 15, 20, 10, 19, 11, 12]
      //         ]
      // };

      vm.options = {
        legend: { display: true },
        scales: {
          xAxes: [],
          yAxes: [{
            type: 'linear',
            ticks: {
              beginAtZero: true
            }
          }]
        },
      };

      vm.onChangeDate = function() {
        console.log(vm.date);
      };

      function newDate(days) {
        return moment().add(days, 'd');
      }

      function activate() {
        dataservice.getCoupons().then(function(coupons) {
          var siteId = $routeParams.siteId,
              site;
       
          if (coupons.length) {
            coupons.forEach(function(coupon) {
              if (siteId == coupon.id) {
                site = coupon;
              }
            });
            if (site) {
              dataservice.setCurrentSite(siteId);
            } else {
              site = coupons[0];         
              dataservice.setCurrentSite(site.id);
              $location.path('/site/'+ site.id + '/coupon');
            }
          } else {
            dataservice.removeCurrentSite();
            $location.path('/site/new/coupon');
          }

          dataservice.getStatistics({
            couponId: site.id,
            from: moment().subtract(7, 'days').format('x'),
            to: moment().format('x')
          }).then(function(data) {
            vm.stat = data;
          });

        });
      }
    }
})();