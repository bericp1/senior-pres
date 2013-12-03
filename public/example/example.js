/**
 * Created by brandon on 10/26/13.
 */
(function(angular){
  'use strict';
  angular.module('exampleModule', ['ngRoute'])
    .controller('ExampleController',  require('./ExampleController'))
    .service('ExampleModel',          require('./ExampleModel'))
    .directive('exampleDirective',    require('./exampleDirective'))
    .factory('exampleService',        require('./exampleService'));

  angular.module('exampleModule')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'example/main.tmpl',
          controller: 'ExampleController'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);
})(angular);