module.exports = ['$http', function($http){
  'use strict';
  return {
    get: function(){
      return $http.get('/example').then(function (response) {
        return response.data;
      });
    }
  };
}];