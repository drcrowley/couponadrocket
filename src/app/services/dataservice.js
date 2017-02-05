angular
  .module('app.services')
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http', '$rootScope', '$location', '$q', 'exception', 'logger', 'localStorageService', 'config', 'logger', 'datacache'];

function dataservice($http, $rootScope, $location, $q, exception, logger, localStorageService, config, logger, datacache) {
  
  var service = {
    getCoupons: getCoupons,
    saveCoupon: saveCoupon,
    deleteCoupon: deleteCoupon,
    activateCoupon: activateCoupon,
    deactivateCoupon: deactivateCoupon,
    getStatistics: getStatistics,
    getCurrentSite: getCurrentSite,
    setCurrentSite: setCurrentSite,
    removeCurrentSite: removeCurrentSite,
    getColorThemes: getColorThemes,
    getRegions: getRegions,
    getUser: getUser,
    updateUser: updateUser,
    changePassword: changePassword,
    getTariffs: getTariffs,
    buyTariff: buyTariff,
    setOrderData: setOrderData,
    getOrderData: getOrderData
  };
 
  return service;

  function getCoupons() {
    var couponsClone,
        coupons = datacache.get('coupons');

    if (coupons) {
      couponsClone = angular.copy(coupons);
    }
    if (couponsClone) {
      return $q.when(couponsClone);
    } else {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/manage/myCoupons', {
        cache: true
      })
      .then(complete)
      .catch(function(message) {
          exception.catcher('XHR Failed')(message);
          $rootScope.isLoading = false;
      });
    }
    
    function complete(data) {
      datacache.put('coupons', data.data);
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
          saveIndex,
          coupons = datacache.get('coupons');

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
      var deleteIndex,
          coupons = datacache.get('coupons');
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

  function getStatistics(params) {
    var statisticsClone,
        statistics = datacache.get('statistics');

    if (statistics) {
      colorThemesClone = angular.copy(statistics);
    }

    if (statisticsClone) {
      return $q.when(statisticsClone);
    } else {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/manage/statistics/' + params.couponId + '/' + params.from + '/' + params.to)
      .then(complete)
      .catch(function(message) {
        exception.catcher('XHR Failed')(message);
        $rootScope.isLoading = false;
      });      
    }

    function complete(data) {
      datacache.put('statistics', data.data);
      $rootScope.isLoading = false;
      return data.data;
    }
  }

  function getCurrentSite() {
    return datacache.get('currentSite');
  }

  function setCurrentSite(siteId) {
    getCoupons().then(function(coupons) {
      coupons.forEach(function(coupon) {
        if(coupon.id == siteId) {
          datacache.put('currentSite', coupon);
        }
      });
      $rootScope.$broadcast('changeCurrentSite');
    });
  }

  function removeCurrentSite() {
    datacache.remove('currentSite');
    $rootScope.$broadcast('changeCurrentSite');
  }

  function getColorThemes() {
    var colorThemesClone,
        colorThemes = datacache.get('colorThemes');

    if (colorThemes) {
      colorThemesClone = angular.copy(colorThemes);
    }

    if (colorThemesClone) {
      return $q.when(colorThemesClone);
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
      datacache.put('colorThemes', data.data);
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
    var userClone,
        user = datacache.get('user');

    if (user) {
      userClone = angular.copy(user);
    }
    
    if (userClone) {
      return $q.when(userClone);
    } else {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/user/myUser', {
        cache: true
      })
      .then(complete)
      .catch(function(message) {
        exception.catcher('XHR Failed')(message);
        $rootScope.isLoading = false;
      });
    }
    
    function complete(data) {
      datacache.put('user', data.data);
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
      datacache.remove('user');
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

  function getTariffs() {
    var tariffsClone,
        tariffs = datacache.get('tariffs');

    if (tariffs) {
      tariffsClone = angular.copy(tariffs);
    }
    
    if (tariffsClone) {
      return $q.when(tariffsClone);
    } else {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/general/tarifs', {
        cache: true
      })
      .then(complete)
      .catch(function(message) {
        exception.catcher('XHR Failed')(message);
        $rootScope.isLoading = false;
      });      
    }

    function complete(data) {
      datacache.put('tariffs', data.data);
      $rootScope.isLoading = false;
      return data.data;
    }    
  }

  function buyTariff(tariffId) {
    $rootScope.isLoading = true;
    return $http.get(config.apiUrl + '/buytariff/' + tariffId)
    .then(complete)
    .catch(function(message) {
      exception.catcher('XHR Failed')(message);
      $rootScope.isLoading = false;
    });

    function complete(data) {
      $rootScope.isLoading = false;
      return data.data;
    }     
  }

  function getOrderData() {
    var orderData = datacache.get('orderData');
    return $q.when(orderData);
  }

  function setOrderData(data) {
    datacache.put('orderData', data);
  }
}