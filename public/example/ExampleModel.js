module.exports = ['exampleService', function(exampleService){
  'use strict';
  var me = this;
  me.pets = [];
  me.alivePet = null;
  me.setAlivePet = function(pet){
    if($.inArray(pet, this.pets) > -1){
      this.alivePet = pet;
    }
  };
  exampleService.get().then(function(pets){
    me.pets = pets;
  });
}];