angular
  .module('app.core')
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http', '$rootScope', '$location', '$q', 'exception', 'logger', 'localStorageService', 'auth'];

function dataservice($http, $rootScope, $location, $q, exception, logger, localStorageService, auth) {
   $http.defaults.headers.common.Authorization = auth.get();
  var service = {
    getCoupons: getCoupons,
    saveCoupon: saveCoupon,
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

    // var coupons = [
    //   {
    //     id: 1,
    //     url: 'https://site1.com',
    //     title: 'Сайт 1',
    //     secretKey: 123,
    //     promoCodeType: 0,
    //     colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
    //     colorScheme: 0,
    //     regionList: ['Томск', 'Пермь'],
    //     status: 'verified'
    //   },
    //   {
    //     id: 2,
    //     url: 'https://site2.com',
    //     title: 'Сайт 2',
    //     secretKey: 123,
    //     colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
    //     colorScheme: 0,
    //     regionList: ['Томск', ' Самара'],
    //     status: 'active',
    //   },
    //   {
    //     id: 3,
    //     url: 'https://site3.com',
    //     title: 'Сайт 3',
    //     secretKey: 123,
    //     colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
    //     colorScheme: 0,
    //     regionList: ['Томск', ' Самара'],
    //     status: 'disabled'
    //   }
    // ];

    // var lsData = coupons;

    var lsData = localStorageService.get('cityList');
    if (lsData) {
      return $q.when(lsData);
    } else {
      return $http.get('http://94.142.139.199:8080/coupon-web/rs/manage/myCoupons')
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


  function saveCoupon() {
    var coupon = {
      "id": null,
      "accessToken":"wervdsdsv",
      "homepageUrl":"http://test.ru",
      "titel":"Test",
      "description":"description dsfdfsfds",
      "text":"lskdnflkdnsfl lkdf slsdkf lskmasda lknas laskjd asldjh akiuhd kishg dakhjs daskijhsdaldsijs",
      "colorTheme":1,
      "couponCode":"sdffds",
      "couponCodeGenerate":true,
      "image": "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",
      "imgUrl":"http://imgUrls.jpg",
      "couponApproveDat":1482681449111,
      "status":"STOP",
      "activeFlag":true,
      "couponSellAtThisMonth":124,
      "couponSellAtThisWeek":12,
      "homepageThemes":null,
      "showRegions":[{"id":1,"name":"reg_0"},{"id":2,"name":"reg_1"},{"id":3,"name":"reg_2"},{"id":4,"name":"reg_3"},{"id":5,"name":"reg_4"},{"id":6,"name":"reg_5"},{"id":7,"name":"reg_6"},{"id":8,"name":"reg_7"},{"id":9,"name":"reg_8"},{"id":10,"name":"reg_9"}],
      "limitPeriod":161
    };
    $http.post('http://94.142.139.199:8080/coupon-web/rs/manage/saveCoupon', coupon)
      .then(complete)
      .catch(function(message) {
          exception.catcher('XHR Failed')(message);
      });


    function complete(data) {
      localStorageService.set('cityList', data.data);
      return data.data;
    } 
  }

  function getCurrentSite() {
    return currentSite;
  }

  function setCurrentSite(siteId) {
    getCoupons().then(function(sites) {
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