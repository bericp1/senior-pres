/*exported exampleDirective */
var exampleDirective = function(){
  'use strict';
  return {
    restrict: 'AEC',
    replace: true,
    templateUrl: 'examples/exampleDirective.tmpl',
    link: function($scope, $elem, attrs){
      $elem.find('button').on('click',function(ev){
        $scope.setAlive($scope.pet);
        $scope.$apply();
        console.log($scope, $elem, attrs, ev);
      });
    }
  };
};