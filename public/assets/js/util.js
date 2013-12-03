/**
 * console.log polyfill
 */
(function(window){
  'use strict';
  if(typeof window.console !== 'object'){
    window.console = {};
  }
  if(typeof window.console.log !== 'function'){
    window.console.log = function(){};
  }

})(window);