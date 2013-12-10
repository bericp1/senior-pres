require('./assets/js/util');
require('./presentation');

(function(angular){
  'use strict';
  angular
    .module('senior-pres', ['compiled-templates', 'btford.socket-io', 'presentation'])
    .config(['socketProvider', '$locationProvider', function(socketProvider, $locationProvider){
      socketProvider.prefix('socket.');
      $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
})(angular);