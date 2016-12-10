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
  };

  var currentSite;

  function getSites() {
    var sites = [
      {
        id: 1,
        url: 'https://site1.com',
        title: 'Сайт 1',
        secretKey: 123,
        colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
        colorScheme: 0,
        regionList: ['Томск', 'Пермь']
      },
      {
        id: 2,
        url: 'https://site2.com',
        title: 'Сайт 2',
        secretKey: 123,
        colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
        colorScheme: 0,
        regionList: ['Томск', ' Самара']
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
}