(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('Home', Home);

  /* @ngInject */
  function Home() {
    var vm = this;
    vm.title = 'Главная';
    activate();

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

    vm.open1 = function() {
      vm.popup1.opened = true;
      console.log(vm.popup1.opened);
    };

    vm.open2 = function() {
      vm.popup2.opened = true;
      console.log(vm.popup2.opened);
    };

    vm.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    vm.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    vm.format = 'dd-MMMM-yyyy',
    vm.altInputFormats = ['M!/d!/yyyy'];

    vm.popup1 = {
      opened: false
    };

    vm.popup2 = {
      opened: false
    };


    vm.labels = ["1995-12-21", "1995-12-22", "1995-12-23", "1995-12-25", "1995-12-26", "1995-12-27"];

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

    function newDate(days) {
      return moment().add(days, 'd');
    }
    function isInclude(arr,obj) {
      return (arr.indexOf(obj) != -1);
    }

    function activate() {
      vm.couponSettings = {
        siteAddress: 'https://vk.com',
        secretKey: 123,
        colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
        colorScheme: 0,
        positionList: [{id: 0, title: 'Снизу'}, {id: 1, title: 'Сбоку'}],
        position: 0,
        themes: [{title: 'Тема 1', checked: true}, {title: 'Тема 2', checked: false}, {title: 'Тема 3', checked: true}],
        availableRegionList: ['Москва', 'Екатеринбург', 'Самара', 'Томск', 'Пермь'],
        regionList: ['Томск', 'Пермь'],
        couponPrice: 10
      }
    }

  }
})();