(function() {
  'use strict';

  angular
    .module('app.faq')
    .controller('Faq', Faq);

    Faq.$inject = ['$uibModal'];
    
    function Faq($uibModal) {
      var vm = this;

      vm.modalInstance = null;

      vm.list = [
        {
          question: 'Lorem ipsum dolo',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quam debitis officia ratione maxime dolor. Itaque molestias maiores nesciunt suscipit doloribus eius harum facere necessitatibus, numquam sint nihil vel ipsa.',
          open: false
        },
        {
          question: 'Lorem ipsum dolo',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quam debitis officia ratione maxime dolor. Itaque molestias maiores nesciunt suscipit doloribus eius harum facere necessitatibus, numquam sint nihil vel ipsa.',
          open: false
        },
        {
          question: 'Lorem ipsum dolo',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quam debitis officia ratione maxime dolor. Itaque molestias maiores nesciunt suscipit doloribus eius harum facere necessitatibus, numquam sint nihil vel ipsa.',
          open: false
        }
      ];

      vm.open = function (size, parentSelector) {
        vm.modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'myModalContent.html',
          controller: 'FaqFeedback', 
          controllerAs: 'vm'
        });
      };

      activate();

      function activate() {

      }
    }
})();

angular.module('app.faq').controller('FaqFeedback', function ($uibModalInstance) {
  var vm = this;

  vm.submit = function () {
    console.log(vm.title, vm.question);
    $uibModalInstance.close();
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});