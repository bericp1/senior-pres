/**
 * Created by brandon on 10/26/13.
 */
/*exported example */
/*global ExampleController, ExampleModel, exampleDirective, exampleService*/
(function(angular, Controller, Model, directive, service){
  'use strict';
  var me = angular.module('exampleModule', []);

  me.controller('ExampleController', Controller);
  me.service('ExampleModel', Model);
  me.directive('exampleDirective', directive);
  me.factory('exampleService', service);
})(angular, ExampleController, ExampleModel, exampleDirective, exampleService);