(function() {
  'use strict';

  angular
    .module('app.faq')
    .controller('Faq', Faq);

    Faq.$inject = ['$uibModal'];
    
    function Faq($uibModal) {
      var vm = this;
      var modalInstance;

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

      vm.submit = function() {
        modalInstance.close();
      }

      vm.open = function (size, parentSelector) {
        modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'myModalContent.html',
          controller: 'Faq',
          controllerAs: 'vm',
        });
        modalInstance.close();
      };

      activate();

      function activate() {

      }
    }
})();