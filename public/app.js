require('./assets/js/util');
require('./example/example');

(function(angular){
  'use strict';
  angular
    .module('senior-pres', ['compiled-templates', 'exampleModule', 'btford.socket-io'])
    .config(['socketProvider', function(socketProvider){
      socketProvider.prefix('socket.');
    }]);
})(angular);