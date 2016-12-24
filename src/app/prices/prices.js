(function() {
  'use strict';

  angular
    .module('app.prices')
    .controller('Prices', Prices);

    Prices.$inject = ['$location', '$uibModal', 'dataservice'];
    
    function Prices($location, $uibModal, dataservice) {

      var vm = this;

      vm.tariffs = [
        {
          title: 'Free',
          count: 5,
          price: 0,
          class: 'default'
        },
        {
          title: 'Econom',
          count: 50,
          price: 490,
          class: 'warning'
        },
        {
          title: 'Start',
          count: 150,
          price: 990,
          class: 'success'
        },
        {
          title: 'Standart',
          count: 400,
          price: 1990,
          class: 'danger'
        }
      ];
        
      vm.pay = function(tariff) {
        dataservice.setOrderData(tariff);

        vm.modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'payment.html',
          controller: 'Payment', 
          controllerAs: 'vm'
        });
      }

    }
})();

angular.module('app.prices').controller('Payment', Payment);

Payment.$inject = ['$location', '$uibModalInstance'];

function Payment($location, $uibModalInstance) {
  var vm = this;

  vm.paymentType = 'card';
  vm.aggree = false;

  vm.changePayType = function(type) {
    vm.paymentType = type;
  };

  vm.requestBill = function() {
    $uibModalInstance.close();
    $location.path('/bill');
  };

};