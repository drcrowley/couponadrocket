(function() {
  'use strict';

  angular
    .module('blocks.logger')
    .factory('logger', logger);

  logger.$inject = ['$log', 'toastr'];

  function logger($log, toastr) {
    var service = {
      showToasts: true,

      error   : error,
      info    : info,
      success : success,
      warning : warning,

      // straight to console; bypass toastr
      log     : $log.log
    };
    toastr.options.timeOut = 1500; // How long the toast will display without user interaction
    toastr.options.extendedTimeOut = 2000; // How long the toast will display after a user hovers over it

    return service;

    function error(message, data, title) {
      toastr.error(message, title);
      $log.error('Error: ' + message, data ? data : '');
    }

    function info(message, data, title) {
      toastr.info(message, title);
      $log.info('Info: ' + message, data ? data : '');
    }

    function success(message, data, title) {
      toastr.success(message, title);
      $log.info('Success: ' + message, data ? data : '');
    }

    function warning(message, data, title) {
      toastr.warning(message, title);
      $log.warn('Warning: ' + message, data ? data : '');
    }
  }
}());