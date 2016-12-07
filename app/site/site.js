(function() {
  'use strict';

  angular
    .module('app.site')
    .controller('Site', Site);

    Site.$inject = ['$translate', '$routeParams', '$location', 'tmhDynamicLocale', 'dataservice'];
    
    function Site($translate, $routeParams, $location, tmhDynamicLocale, dataservice) {
      $translate.use('ru');
      tmhDynamicLocale.set('ru');

      var vm = this;
      vm.title = 'Главная';
      activate();

      vm.couponSettings = {
        regionList: []
      };
      vm.availableRegionList = ['Москва', 'Екатеринбург', 'Самара', 'Томск', 'Пермь'];

      var siteId = $routeParams.id,
          sites = dataservice.getSites();

      if (sites.length) {
        switch (siteId) {
          case 'new':
            $location.url('/sites/new');
            break;
            
          case 'default':
            $location.url('/sites/' + sites[0].id);
            vm.couponSettings = sites[0];
            break;

          default:
            sites.forEach(function(item) {
              if (item.id == siteId) {
                vm.couponSettings = item;
              }
            });
        }
      } else {
        $location.url('/sites/new');
      }

      vm.submitCouponSettings = function() {
        console.log(vm.couponSettings);
      }

      vm.addRegion = function() {
        var regionList = vm.couponSettings.regionList;
        if(vm.region && !isInclude(regionList, vm.region)) {
          regionList.push(vm.region);
        } 
      }

      vm.removeRegion = function(region) {
        var regionList = vm.couponSettings.regionList;
        var regionIndex = regionList.indexOf(region);

        if (regionIndex > -1) {
          regionList.splice(regionIndex, 1);
        }
      }

      // Статистика
      vm.datePopupEnd = false;
      vm.datePopupStart = false;
      vm.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: moment('1995-12-21'),
        startingDay: 1,
        showWeeks: false
      };
      vm.format = 'dd.MM.yyyy',
      vm.labels = ['1995-12-21', '1995-12-22', '1995-12-23', '1995-12-25', '1995-12-26', '1995-12-27'];
      vm.series = ['Показ купона', 'Посещаемость', 'Продажа купона'];
      vm.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90],
        [10, 15, 20, 10, 19, 11, 12]
      ];
      vm.options = {
        legend: { display: true },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day',
              unitStepSize: 1
            }
          }],
        },
      };

      vm.onChangeDate = function() {
        console.log(vm.date);
      };

      function newDate(days) {
        return moment().add(days, 'd');
      }
      function isInclude(arr,obj) {
        return (arr.indexOf(obj) != -1);
      }

      function activate() {

      }
    }
})();