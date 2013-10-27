/**
 * Created by brandon on 10/26/13.
 */
(function(angular){
  'use strict';
  angular.module('not-a-sock-drawer', ['compiled-templates', 'ngRoute', 'exampleModule'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'examples/main.tmpl',
          controller: 'ExampleController'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);
})(angular);