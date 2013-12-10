module.exports = ['$scope', '$cookieStore', '$location', function($scope, $cookieStore, $location){
  'use strict';

  $scope.opts = $cookieStore.get('matrixOpts') || {};

  $scope.$watchCollection('opts', function(){
    console.log('updated');
    $cookieStore.put('matrixOpts', $scope.opts);
  }, true);

  $scope.back = function(){
    $location.path('/pres');
  };

  $scope.reset = function(){
    $cookieStore.remove('matrixOpts');
    $location.path('/pres');
    $location.reload();
  };

}];