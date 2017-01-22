angular
  .module('app.services')
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http', '$rootScope', '$location', '$q', 'exception', 'logger', 'localStorageService', 'CONSTANT'];

function dataservice($http, $rootScope, $location, $q, exception, logger, localStorageService, CONSTANT) {
  
  var service = {
    getCoupons: getCoupons,
    saveCoupon: saveCoupon,
    deleteCoupon: deleteCoupon,
    getCurrentSite: getCurrentSite,
    setCurrentSite: setCurrentSite,
    removeCurrentSite: removeCurrentSite,
    getColorThemes: getColorThemes,
    getRegions: getRegions,

    setOrderData: setOrderData,
    getOrderData: getOrderData
  };
 
  return service;

  var currentSite;
  var orderData;

  function getCoupons() {
    var lsData = localStorageService.get('coupons');
    if (lsData) {
      return $q.when(lsData);
    } else {
      return $http.get(CONSTANT.apiUrl + '/manage/myCoupons')
      .then(complete)
      .catch(function(message) {
          exception.catcher('XHR Failed')(message);
      });
    }
    
    function complete(data) {
      localStorageService.set('coupons', data.data);
      return data.data;
    }    
  }

  function saveCoupon(coupon) {
    return $http.post(CONSTANT.apiUrl + '/manage/saveCoupon', coupon)
    .then(complete)
    .catch(function(message) {
      exception.catcher('XHR Failed')(message);
    });

    function complete(data) {
      getCoupons().then(function(coupons) {
        var coupons = coupons,
            currentCoupon = coupon,
            saveIndex;

        coupons.forEach(function(coupon, index) {
          if (currentCoupon.id == coupon.id) {
            saveIndex = index;
          }
        });

        if (saveIndex) {
          coupons[saveIndex] = currentCoupon;
        } else {
          coupons.push(currentCoupon);
        }
       
        localStorageService.set('coupons', coupons);
        return data.data;
      });
    }
  }

  function deleteCoupon(couponId) {
    return $http.get(CONSTANT.apiUrl + '/manage/deleteCoupon/' + couponId)
    .then(complete)
    .catch(function(message) {
      exception.catcher('XHR Failed')(message);
    });

    function complete(data) {
      getCoupons().then(function(coupons) {
        var coupons = coupons,
            deleteIndex;
        coupons.forEach(function(coupon, index) {
          if (couponId == coupon.id) {
            deleteIndex = index;
          }
        });
        coupons.splice(deleteIndex, 1);
        localStorageService.set('coupons', coupons);
        return data.data;
      });
    }
  }

  function getCurrentSite() {
    return currentSite;
  }

  function setCurrentSite(siteId) {
    getCoupons().then(function(coupons) {
      coupons.forEach(function(coupon) {
        if(coupon.id == siteId) {
          currentSite = coupon;
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
      return $http.get(CONSTANT.apiUrl + '/general/colorThemes')
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
    return $http.get(CONSTANT.apiUrl + '/general/regions/' + value + '/RU')
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