(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$rootScope', '$location', '$q', '$translate', 'exception', 'logger', 'localStorageService', 'config', 'datacache', 'auth'];

  function dataservice($http, $rootScope, $location, $q, $translate, exception, logger, localStorageService, config, datacache, auth) {
    
    var service = {
      getCoupons: getCoupons,
      saveCoupon: saveCoupon,
      deleteCoupon: deleteCoupon,
      activateCoupon: activateCoupon,
      deactivateCoupon: deactivateCoupon,
      verifyIntegration: verifyIntegration,
      getStatistics: getStatistics,
      getCurrentSite: getCurrentSite,
      setCurrentSite: setCurrentSite,
      removeCurrentSite: removeCurrentSite,
      getColorThemes: getColorThemes,
      getRegions: getRegions,
      getUser: getUser,
      updateUser: updateUser,
      changePassword: changePassword,
      logout: logout,
      getTariffs: getTariffs,
      buyTariff: buyTariff,
      getInvoice: getInvoice,
      getFaq: getFaq,
      sendQuestion: sendQuestion,
      getI18n: getI18n
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
          cache: datacache
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
      datacache.remove('coupons');
      datacache.remove(config.apiUrl + '/manage/myCoupons');

      return $http.get(config.apiUrl + '/manage/activate/' + couponId)
      .then(complete)
      .catch(function(message) {
        exception.catcher('XHR Failed')(message);
        $rootScope.isLoading = false;
      });

      function complete(data) {
        $rootScope.isLoading = false;
        logger.success('Купон успешно активирован', couponId);
        return data.data;
      }    
    }

    function deactivateCoupon(couponId) {
      $rootScope.isLoading = true;
      datacache.remove('coupons');
      datacache.remove(config.apiUrl + '/manage/myCoupons');

      return $http.get(config.apiUrl + '/manage/deactivate/' + couponId)
      .then(complete)
      .catch(function(message) {
        exception.catcher('XHR Failed')(message);
        $rootScope.isLoading = false;
      });

      function complete(data) {
        $rootScope.isLoading = false;
        logger.success('Купон успешно деактивирован', couponId);
        return data.data;
      }    
    }

    function verifyIntegration(couponId) {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/manage/verify/' + couponId)
      .then(complete)
      .catch(function(message) {
        exception.catcher('XHR Failed')(message);
        $rootScope.isLoading = false;
      });

      function complete(data) {
        $rootScope.isLoading = false;
        logger.success('Отправлен запрос на верификацию', couponId);
        return data.data;
      }
    }

    function getStatistics(params) {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/manage/statistics/' + params.couponId + '/' + params.from + '/' + params.to)
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
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/general/colorThemes', {
        cache: true
      })
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
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/user/myUser', {
        cache: datacache
      })
      .then(complete)
      .catch(function(message) {
        exception.catcher('XHR Failed')(message);
        $rootScope.isLoading = false;
      });
      
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
        datacache.remove(config.apiUrl + '/user/myUser');
        datacache.remove('user');
        $rootScope.isLoading = false;
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

    function logout() {
      $rootScope.isLoading = true;
      return $http.post(config.apiUrl + '/user/logout')
      .then(complete)
      .catch(function(message) {
        auth.remove();
        $rootScope.isLoading = false;
      });
      
      function complete(data) {
        $rootScope.isLoading = false;
        auth.remove();
        return data.data;
      }
    }

    function getTariffs() {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/general/tarifs', {
        cache: true
      })
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

    function buyTariff(tariffId) {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/buytarif/buy/' + tariffId)
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

    function getInvoice(invoiceId) {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/buytarif/invoice/' + invoiceId + '/' + auth.get(), {
        transformResponse: function (data, status, headers) {
          var pdf;
          if (data) {
            pdf = new Blob([data], {
                type: 'application/pdf'
            });
          }
          return pdf;
        }
      })
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

    function getFaq() {
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/general/faq/RU', {
        cache: true
      })
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

    function sendQuestion(question) {
      $rootScope.isLoading = true;
      return $http.post(config.apiUrl + '/user/sendQuestion', question)
      .then(complete)
      .catch(function(message) {
        exception.catcher('XHR Failed')(message);
        $rootScope.isLoading = false;
      });

      function complete(data) {
        $rootScope.isLoading = false;
        logger.success('Вопрос отправлен');
        return data.data;
      }
    }

    function getI18n() {
      var lang = $translate.proposedLanguage().toUpperCase();
      $rootScope.isLoading = true;
      return $http.get(config.apiUrl + '/general/i18n/' + lang, {
        cache: true
      })
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
  }
  
})();