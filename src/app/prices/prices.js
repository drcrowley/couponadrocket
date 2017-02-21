(function() {
  'use strict';

  angular
    .module('app.prices')
    .controller('Prices', Prices);

    Prices.$inject = ['$scope', '$location', '$uibModal', 'dataservice', 'logger', 'tariffs', 'user'];
    
    function Prices($scope, $location, $uibModal, dataservice, logger, tariffs, user) {
      var vm = this;

      vm.classes = ['default', 'warning', 'success', 'danger'];
      vm.tariffs = tariffs;
      vm.user = user;
      vm.aggree = false;

      vm.pay = function(tariff) {
        vm.orderData = tariff;

        if (tariff.price <= 0) return false;
           vm.paymentModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/prices/prices-payment.html',
            scope: $scope,
            controllerAs: 'vm'
          });         
      };

      vm.showOffer = function(event) {
        event.stopPropagation();
        event.preventDefault();
        
        $uibModal.open({
          animation: true,
          templateUrl: 'app/prices/prices-offer.html'
        });
      };

      vm.buy = function(id) {
        vm.paymentModalInstance.close();

        dataservice.updateUser(vm.user).then(function() {
          dataservice.buyTariff(id).then(function(data) {
            vm.invoice = data;
            $uibModal.open({
              animation: true,
              templateUrl: 'app/prices/prices-thank.html',
              scope: $scope,
              controllerAs: 'vm'
            });
          });
        });  
      };

      vm.getInvoice = function(event, invoiceId) {
        event.preventDefault();
        dataservice.getInvoice(invoiceId).then(function(data, status, headers) {
          var linkElement = document.createElement('a'),
              blob = data,
              url = window.URL.createObjectURL(blob);

          linkElement.setAttribute('href', url);
          linkElement.setAttribute("download", 'invoice');

          var clickEvent = new MouseEvent("click", {
              "view": window,
              "bubbles": true,
              "cancelable": false
          });

          linkElement.dispatchEvent(clickEvent);
        });
      };

    }
})();