angular
  .module('app')
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http'];

function dataservice($http) {
  return {
    getSites: getSites
  };

  function getSites() {
    var sites = [
      {
        id: 1,
        address: 'https://site1.com',
        title: 'Сайт 1',
        secretKey: 123,
        colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
        colorScheme: 0,
        regionList: ['Томск', 'Пермь']
      },
      {
        id: 2,
        address: 'https://site2.com',
        title: 'Сайт 2',
        secretKey: 123,
        colorSchemeList: [{id: 0, title: 'Синий'}, {id: 1, title: 'Зеленый'}, {id: 2, title: 'Белый'}],
        colorScheme: 0,
        regionList: ['Томск', 'Пермь']
      }
    ];
    return sites
  }
}