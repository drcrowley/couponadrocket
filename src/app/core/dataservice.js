angular
  .module('app.core')
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http', '$rootScope', '$location', '$q', 'exception', 'logger', 'localStorageService'];

function dataservice($http, $rootScope, $location, $q, exception, logger, localStorageService) {

  var service = {
    getCoupons: getCoupons,
    getCurrentSite: getCurrentSite,
    setCurrentSite: setCurrentSite,
    removeCurrentSite: removeCurrentSite,

    setOrderData: setOrderData,
    getOrderData: getOrderData
  };

  return service;

  var currentSite;
  var orderData;


  function getCoupons() {
    // $http.get('http://94.142.139.199:8080/coupon-web/rs/manage/myCoupons')
    //     .then(function(response) {
    //       console.log(response)
    // });

    var coupons = [
      {
        id: 1,
        url: 'https://site1.com',
        title: 'Сайт 1',
        secretKey: 123,
        promoCodeType: 0,
        colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
        colorScheme: 0,
        regionList: ['Томск', 'Пермь'],
        status: 'verified'
      },
      {
        id: 2,
        url: 'https://site2.com',
        title: 'Сайт 2',
        secretKey: 123,
        colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
        colorScheme: 0,
        regionList: ['Томск', ' Самара'],
        status: 'active',
      },
      {
        id: 3,
        url: 'https://site3.com',
        title: 'Сайт 3',
        secretKey: 123,
        colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
        colorScheme: 0,
        regionList: ['Томск', ' Самара'],
        status: 'disabled'
      }
    ];

    var lsData = coupons;

    // var lsData = localStorageService.get('cityList');
    if (lsData) {
      return $q.when(lsData);
    } else {
      return $http.post('https://staging.papajohns.ru/api/city/list')
      .then(complete)
      .catch(function(message) {
          exception.catcher('XHR Failed')(message);
      });      
    }
    
    function complete(data) {
      localStorageService.set('cityList', data.data);
      return data.data;
    }    


    return sites
  }

  function getCurrentSite() {
    return currentSite;
  }

  function setCurrentSite(siteId) {
    getCoupons().then(function(sites) {
      console.log(sites)
      sites.forEach(function(site) {
        if(site.id == siteId) {
          currentSite = site;
        }
      });

      $rootScope.$broadcast('changeCurrentSite');
    });


  }

  function removeCurrentSite() {
    currentSite = null;
    $rootScope.$broadcast('changeCurrentSite');
  }


  function getOrderData() {
    return orderData;
  }

  function setOrderData(data) {
    orderData = data
  }
}