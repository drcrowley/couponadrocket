(function() {
  'use strict';

  angular
    .module('app.faq')
    .controller('Faq', Faq);

    Faq.$inject = ['$rootScope', '$scope', '$uibModal', 'translations', 'dataservice', 'faq'];
    
    function Faq($rootScope, $scope, $uibModal, translations, dataservice, faq) {
      var vm = this;

      $rootScope.title = translations['C_HEAD_FAQ'];

      vm.faq = faq;

      vm.open = function () {
        vm.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/faq/faq-feedback.html',
          scope: $scope,
          controllerAs: 'vm'
        });
      };

      vm.sendQuestion = function () {
        dataservice.sendQuestion(vm.question).then(function() {
          vm.modalInstance.close();
        });
      };
    }
})();