angular
  .module('app.services')
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http', '$rootScope', '$location', '$q', 'exception', 'logger', 'localStorageService', 'config', 'logger'];

function dataservice($http, $rootScope, $location, $q, exception, logger, localStorageService, config, logger) {
  
  var service = {
    getCoupons: getCoupons,
    saveCoupon: saveCoupon,
    deleteCoupon: deleteCoupon,
    activateCoupon: activateCoupon,
    deactivateCoupon: deactivateCoupon,
    getCurrentSite: getCurrentSite,
    setCurrentSite: setCurrentSite,
    removeCurrentSite: removeCurrentSite,
    getColorThemes: getColorThemes,
    getRegions: getRegions,
    getUser: getUser,
    updateUser: updateUser,
    changePassword: changePassword,

    setOrderData: setOrderData,
    getOrderData: getOrderData
  };
 
  return service;

  var coupons,
      user,
      currentSite,
      orderData;

  function getCoupons() {
    var couponsClone;
    if (coupons) {
      couponsClone = angular.copy(coupons);
    }
    if (couponsClone) {
      return $q.when(couponsClone);
    } else {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/manage/myCoupons')
      .then(complete)
      .catch(function(message) {
          exception.catcher('XHR Failed')(message);
          $rootScope.isLoading = false;
      });
    }
    
    function complete(data) {
      coupons = data.data;
      $rootScope.isLoading = false;
      return data.data;
    }    
  }

  function saveCoupon(coupon) {
    $rootScope.isLoading = true;
    return $http.post(config.apiUrl + '/manage/saveCoupon', coupon)
    .then(complete)
    .catch(function(message) {
      exception.catcher('XHR Failed')(message);
      $rootScope.isLoading = false;
    });

    function complete(data) {
      var currentCoupon = data.data,
          saveIndex;

      coupons.forEach(function(coupon, index) {
        if (currentCoupon.id == coupon.id) {
          saveIndex = index;
        }
      });

      if (saveIndex != undefined) {
        coupons[saveIndex] = currentCoupon;
      } else {
        coupons.push(currentCoupon);
      }
     
      $rootScope.isLoading = false;

      logger.success('Купон успешно сохранен', coupon.id);
      return data.data;
    }
  }

  function deleteCoupon(couponId) {
    $rootScope.isLoading = true;
    return $http.get(config.apiUrl + '/manage/deleteCoupon/' + couponId)
    .then(complete)
    .catch(function(message) {
      exception.catcher('XHR Failed')(message);
      $rootScope.isLoading = false;
    });

    function complete(data) {
      var deleteIndex;
      coupons.forEach(function(coupon, index) {
        if (couponId == coupon.id) {
          deleteIndex = index;
        }
      });
      coupons.splice(deleteIndex, 1);
      $rootScope.isLoading = false;
      logger.success('Купон успешно удален', couponId);
      return data.data;
    }
  }


  function activateCoupon(couponId) {
    $rootScope.isLoading = true;
    return $http.get(config.apiUrl + '/manage/activate/' + couponId)
    .then(complete)
    .catch(function(message) {
      exception.catcher('XHR Failed')(message);
      $rootScope.isLoading = false;
    });

    function complete(data) {
      coupons = null;
      $rootScope.isLoading = false;
      logger.success('Купон успешно активирован', couponId);
      return data.data;
    }    
  }

  function deactivateCoupon(couponId) {
    $rootScope.isLoading = true;
    return $http.get(config.apiUrl + '/manage/deactivate/' + couponId)
    .then(complete)
    .catch(function(message) {
      exception.catcher('XHR Failed')(message);
      $rootScope.isLoading = false;
    });

    function complete(data) {
      coupons = null;
      $rootScope.isLoading = false;
      logger.success('Купон успешно деактивирован', couponId);
      return data.data;
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
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/general/colorThemes')
      .then(complete)
      .catch(function(message) {
        exception.catcher('XHR Failed')(message);
        $rootScope.isLoading = false;
      });      
    }

    function complete(data) {
      localStorageService.set('colorThemes', data.data);
      $rootScope.isLoading = false;
      return data.data;
    }
  }

  function getRegions(value) {
    return $http.get(config.apiUrl + '/general/regions/' + value + '/RU')
    .then(complete)
    .catch(function(message) {
      exception.catcher('XHR Failed')(message);
    });

    function complete(data) {
      return data.data;
    }    
  }

  function getUser() {
    var userClone;
    if (user) {
      userClone = angular.copy(user);
    }
    
    if (userClone) {
      return $q.when(userClone);
    } else {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/user/myUser')
      .then(complete)
      .catch(function(message) {
        exception.catcher('XHR Failed')(message);
        $rootScope.isLoading = false;
      });
    }
    
    function complete(data) {
      user = data.data;
      $rootScope.isLoading = false;
      return data.data;
    }
  }

  function updateUser(userData) {
    $rootScope.isLoading = true;
    return $http.post(config.apiUrl + '/user/updateUser', userData)
    .then(complete)
    .catch(function(message) {
      exception.catcher('XHR Failed')(message);
      $rootScope.isLoading = false;
    });
    
    function complete(data) {
      user = null;
      $rootScope.isLoading = false;
      logger.success('Настройки сохранены');
      return data.data;
    }
  }

  function changePassword(data) {
    $rootScope.isLoading = true;
    return $http.post(config.apiUrl + '/user/changePassword', data)
    .then(complete)
    .catch(function(message) {
      exception.catcher('XHR Failed')(message);
      $rootScope.isLoading = false;
    });
    
    function complete(data) {
      $rootScope.isLoading = false;
      logger.success('Пароль изменен');
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