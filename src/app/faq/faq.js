(function() {
  'use strict';

  angular
    .module('app.faq')
    .controller('Faq', Faq);

    Faq.$inject = ['$scope', '$uibModal', 'dataservice', 'faq'];
    
    function Faq($scope, $uibModal, dataservice, faq) {
      var vm = this;

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