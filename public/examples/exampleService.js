/*exported exampleService */
var exampleService = (function(){
  'use strict';
  return ['$http', function($http){
    return {
      get: function(){
        return $http.get('/example').then(function (response) {
          return response.data;
        });
      }
    };
  }];
})();