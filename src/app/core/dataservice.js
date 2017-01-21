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
    getColorThemes: getColorThemes,
    getRegions: getRegions,

    setOrderData: setOrderData,
    getOrderData: getOrderData
  };

  return service;

  var apiUrl = 'http://94.142.139.199:8080/coupon-web/rs';

  var currentSite;
  var orderData;

  function getCoupons() {

    var lsData = localStorageService.get('coupons');
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
      localStorageService.set('coupons', data.data);
      return data.data;
    }    

    return sites
  }


  function saveCoupon(coupon) {
    $http.post('http://94.142.139.199:8080/coupon-web/rs/manage/saveCoupon', coupon)
      .then(complete)
      .catch(function(message) {
          exception.catcher('XHR Failed')(message);
      });

    function complete(data) {
      localStorageService.set('coupons', data.data);
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

  function getColorThemes() {
    var lsData = localStorageService.get('colorThemes');
    if (lsData) {
      return $q.when(lsData);
    } else {
      return $http.get('http://94.142.139.199:8080/coupon-web/rs/general/colorThemes')
      .then(complete)
      .catch(function(message) {
          exception.catcher('XHR Failed')(message);
      });      
    }

    function complete(data) {
      localStorageService.set('colorThemes', data.data);
      return data.data;
    }
  }

  function getRegions(value) {
    return $http.get('http://94.142.139.199:8080/coupon-web/rs/general/regions/' + value + '/RU')
    .then(complete)
    .catch(function(message) {
        exception.catcher('XHR Failed')(message);
    });

    function complete(data) {
      return data.data;
    }    
  }

  function getOrderData() {
    return orderData;
  }

  function setOrderData(data) {
    orderData = data
  }
}