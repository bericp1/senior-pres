require('./assets/js/util');
require('./example');

(function(angular){
  'use strict';
  angular
    .module('not-a-sock-drawer', ['compiled-templates', 'btford.socket-io'])
    .config(['socketProvider', function(socketProvider){
      socketProvider.prefix('socket.');
    }]);
})(angular);