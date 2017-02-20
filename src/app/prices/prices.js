(function() {
  'use strict';

  angular
    .module('app.prices')
    .controller('Prices', Prices);

    Prices.$inject = ['$location', '$uibModal', 'dataservice', 'logger', 'tariffs', 'user'];
    
    function Prices($location, $uibModal, dataservice, logger, tariffs, user) {

      var vm = this;

      vm.classes = ['default', 'warning', 'success', 'danger'];

      vm.tariffs = tariffs;

      vm.user = user;

      vm.pay = function(tariff) {
        dataservice.setOrderData(tariff);

        if (tariff.price <= 0) return false;

           $uibModal.open({
            animation: true,
            templateUrl: 'payment.html',
            controller: 'Payment', 
            controllerAs: 'vm'
          });         
      };

    }
})();

angular.module('app.prices').controller('Payment', Payment);

Payment.$inject = ['$location', '$uibModalInstance', '$uibModal', '$q', 'dataservice', 'config'];

function Payment($location, $uibModalInstance, $uibModal, $q, dataservice, config) {
  var vm = this;

  vm.aggree = false;

  activate();

  vm.buy = function(id) {
    $uibModalInstance.close();
    dataservice.updateUser(vm.user).then(function() {
      dataservice.buyTariff(id).then(function(data) {

        $uibModal.open({
          animation: true,
          templateUrl: 'thank-popup.html',
          controller: function () {
            var vm = this;

            vm.getInvoice = function(event) {
              event.preventDefault();
              dataservice.getInvoice(data.id).then(function(data, status, headers) {
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
          },
          controllerAs: 'vm'
        });

      });
    });  
  };

  vm.showOffer = function($event) {

    $event.stopPropagation();
    $event.preventDefault();
    
    $uibModal.open({
      animation: true,
      templateUrl: 'offer.html'
    });
  };  

  function activate() {
    $q.all({
      orderData: dataservice.getOrderData(), 
      user: dataservice.getUser()
    }).then(function(data) {
      vm.orderData = data.orderData;
      vm.user = data.user;
    });    
  }
};