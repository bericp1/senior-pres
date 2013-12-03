/**
 *  Creates an AngularJS Resource that's patched to work with the existing express setup.
 *  @author bericp1
 *  @param resourcePath The path (no trailing slash) to the CRUD-like interface for the resource
 */

module.exports = function(resourcePath){
  'use strict';
  return ['$resource', function($resource){
    return $resource(
      resourcePath + '/:_id',
      {'_id':'@_id'},
      {
        'deleteAll': {
          method: 'DELETE',
          isArray: true,
          params: {
            '_id': '*'
          }
        }
      }
    );
  }];
};