(function() {
  'use strict';

  angular
    .module('app.prices')
    .controller('Prices', Prices);

    Prices.$inject = ['$rootScope', '$scope', '$location', '$uibModal', 'translations', 'dataservice', 'logger', 'tariffs', 'user', 'auth', 'config'];
    
    function Prices($rootScope, $scope, $location, $uibModal, translations, dataservice, logger, tariffs, user, auth, config) {
      var vm = this;

      $rootScope.title = translations['C_HEAD_TARIFFS'];

      vm.companyTypes = [
        translations['C_CMB_COMPANY_TYPE_1'], 
        translations['C_CMB_COMPANY_TYPE_2'],
        translations['C_CMB_COMPANY_TYPE_3'],
        translations['C_CMB_COMPANY_TYPE_4']];

      vm.classes = ['default', 'info', 'success', 'warning'];
      vm.tariffs = tariffs;
      vm.user = user;
      vm.aggree = false;
      if (!vm.user.companyType) {
        vm.user.companyType = vm.companyTypes[0];
      }
      vm.tooltips = [ 
        translations['C_TOOLTIP_TARIFF_1'], 
        translations['C_TOOLTIP_TARIFF_2'], 
        translations['C_TOOLTIP_TARIFF_3'], 
        translations['C_TOOLTIP_TARIFF_4']];
                      
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
            vm.invoiceUrl = config.apiUrl + '/buytarif/invoice/' + vm.invoice.id + '/' + auth.get();
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