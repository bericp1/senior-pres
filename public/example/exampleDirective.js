module.exports = function(){
  'use strict';
  return {
    restrict: 'AEC',
    replace: true,
    templateUrl: 'example/exampleDirective.tmpl',
    link: function($scope, $elem, attrs){
      $elem.find('button').on('click',function(ev){
        $scope.setAlive($scope.pet);
        $scope.$apply();
      });
    }
  };
};