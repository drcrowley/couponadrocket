(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('Home', Home);

  /* @ngInject */
  function Home() {
    var vm = this;
    vm.title = 'Главная';
    activate();

    function activate() {

    }
  }
})();