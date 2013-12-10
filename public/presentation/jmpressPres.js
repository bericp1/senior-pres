module.exports = [function(){
  'use strict';
  return {
    restrict: 'A',
    scope: {
      opts: '=jmpressPres'
    },
    link: function(scope, element){
      element.jmpress(scope.opts);
    }
  };
}];