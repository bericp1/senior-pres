module.exports = function(req, res){
  'use strict';
  var Pet = function(name, age){
    this.name = name;
    this.age = age;
  };
  //Simulate latency
  setTimeout(function(){
    res.json([
      new Pet('Jinx', 100),
      new Pet('Matt', 2),
      new Pet('Luther', 20),
      new Pet('Raj', 10001),
      new Pet('Pala', 102),
      new Pet('Yipi', 7),
      new Pet('KoaKoa', 9),
      new Pet('Happy', 14)
    ]);
  }, 2000);
};