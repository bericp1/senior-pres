var express = require('express'),
  DBActions = require('./db-actions'),
  utils     = require('./utils'),
  extend     = require('xtend');

var actionsCache = {};

module.exports = exports = function(models){

  if(typeof models === 'string'){
    models = (function(modelHandlers){
      var modelsTmp = {};
      modelsTmp[modelHandlers] = {};
      return modelsTmp;
    })(models);
  }

  if(Array.isArray(models)){
    models = (function(modelHandlers){
      var modelsTmp = {};
      modelHandlers.forEach(function(modelName){
        modelsTmp[modelName] = {};
      });
      return modelsTmp;
    })(models);
  }

  if(typeof models !== 'object'){
    return function(req, res, next){
      next();
    };
  }

  var app = express();
  app.use(utils.adminCheckMiddleware);
  app.use(app.router);

  for(var modelName in models){
    if(models.hasOwnProperty(modelName)){
      var defaultHandlers = {
        'getAll': {
          path: '',
          method: 'get',
          admin: false
        },
        'getOne': {
          path: '/:id',
          method: 'get',
          admin: false
        },
        'update': {
          path: '',
          method: 'post',
          admin: true
        },
        'delete': {
          path: '/:id',
          method: 'delete',
          admin: true
        }
      };
      var handlers = extend(defaultHandlers, models[modelName]);

      var Actions = new DBActions(utils.toModelName(modelName));

      for(var handler in handlers){
        if(handlers.hasOwnProperty(handler)){
          var props = handlers[handler];
          if(typeof props === 'boolean' && typeof defaultHandlers[handler] === 'object'){
            props = extend(defaultHandlers[handler], {admin: props});
          }
          if(typeof props === 'object')
            if(props.hasOwnProperty('method') && props.hasOwnProperty('path') && props.hasOwnProperty('admin'))
              app[props.method]('/' + utils.toModelPath(modelName) + props.path, Actions[handler + 'Handler'](props.admin));
        }
      }
    }
  }
  return app;
};