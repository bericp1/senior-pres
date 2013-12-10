module.exports = ['$scope', function($scope){
  'use strict';

  $scope.data = {
    opts: {
      stepSelector: 'section'
    },
    matrix: {
      primary: '51,51,51',
      alpha: '0.2'
    },
    startAnimation: 'drive-up after 1s step',
    defaultAnimation: 'drive-up after 500ms prev'
  };

  var templates = {
    'spiral': {
      children: function(idx){
        idx = idx/(Math.PI*10)+2;
        return {
          x: Math.PI * 300 * Math.cos(1000 * idx) * idx * idx * idx * idx,
          y: Math.PI * 350 * Math.sin(1000 * idx) * idx * idx,
          z: idx*50000,
          rotateZ: 180
        };
      }
    },
    'main': {
      children: function(idx){
        return {
          x: 1200*idx,
          y: 0,
          z: -500,
          scale: 0.6,
          secondary: {
            '': 'grandchildren self',
            z: 500
          }
        };
      }
    }
  };

  for(var template in templates){
    if(templates.hasOwnProperty(template)){
      $.jmpress('template', template, templates[template]);
    }
  }

}];