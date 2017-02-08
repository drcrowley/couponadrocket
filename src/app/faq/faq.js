(function() {
  'use strict';

  angular
    .module('app.faq')
    .controller('Faq', Faq);

    Faq.$inject = ['$uibModal', 'faq'];
    
    function Faq($uibModal, faq) {
      var vm = this;

      vm.modalInstance = null;

      vm.faq = faq;

      vm.open = function (size, parentSelector) {
        vm.modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'feedback.html',
          controller: 'FaqFeedback', 
          controllerAs: 'vm'
        });
      };
    }
})();

angular.module('app.faq').controller('FaqFeedback', FaqFeedback);

FaqFeedback.$inject = ['$uibModalInstance', 'dataservice'];

function FaqFeedback($uibModalInstance, dataservice) {
  var vm = this;

  vm.sendQuestion = function () {
    dataservice.sendQuestion(vm.question).then(function() {
      $uibModalInstance.close();      
    });
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};