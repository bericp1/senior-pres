(function(angular, $){
  'use strict';

  angular.module('presentation', ['ngRoute', 'ngCookies'])
    .directive('jmpressPres', require('./jmpressPres'))
    .directive('matrix', require('./matrix'))
    .controller('PresController', require('./controller'))
    .controller('AdminController', require('./admin'))
    .config(['$routeProvider', '$locationProvider', function($routeProvider){
      $routeProvider
        .when('/pres', {
          templateUrl: 'presentation/main.tmpl',
          controller: 'PresController'
        })
        .when('/admin', {
          templateUrl: 'presentation/admin.tmpl',
          controller: 'AdminController'
        })
        .otherwise({
          redirectTo: '/pres'
        });
    }]);

  $(document).keydown(function(e){
    if(e.which === 116 && !e.ctrlKey){
      e.preventDefault();
      return false;
    }else{
      return true;
    }
  });

})(angular, jQuery);