var Schema = require('mongoose').Schema;
module.exports = {
  name: 'Pet',
  schema: {
    name:   {
      type: String,
      validate: [function(name){
        return name.trim().toLowerCase() !== '';
      }, 'Name can\'t be empty.']
    },
    age: Number,
    '_army': [{
      type: Schema.Types.ObjectId,
      ref: 'Pet',
      'default': []
    }]
  },
  autoLoad: {
    'getAll': false,
    'getOne': false,
    'update': false,
    'delete': false
  }
};