module.exports = [function(){
  'use strict';
  return {
    restrict: 'A',
    scope: {
      opts: '=jmpressPress'
    },
    link: function(scope, element){
      element.jmpress(scope.opts);
    }
  };
}];