module.exports = function(){
  'use strict';
  return {
    restrict: 'AEC',
    replace: true,
    templateUrl: 'example/exampleDirective.tmpl',
    link: function($scope, $elem){
      $elem.find('button').on('click',function(){
        $scope.setAlive($scope.pet);
        $scope.$apply();
      });
    }
  };
};