angular
  .module('app')
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http', '$rootScope'];

function dataservice($http, $rootScope) {
  return {
    getSites: getSites,
    getCurrentSite: getCurrentSite,
    setCurrentSite: setCurrentSite,
    removeCurrentSite: removeCurrentSite,

    setOrderData: setOrderData,
    getOrderData: getOrderData
  };

  var currentSite;
  var orderData;

  function getSites() {
    var sites = [
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
    return sites
  }

  function getCurrentSite() {
    return currentSite;
  }

  function setCurrentSite(siteId) {
    var sites = getSites();

    sites.forEach(function(site) {
      if(site.id == siteId) {
        currentSite = site;
      }
    });

    $rootScope.$broadcast('changeCurrentSite');
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