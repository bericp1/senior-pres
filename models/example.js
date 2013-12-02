var Schema = require('mongoose').Schema;
module.exports = {
  name: 'Example',
  schema: {
    name:   {
      type: String,
      validate: [function(name){
        return name.trim().toLowerCase() !== '';
      }, 'Name can\'t be empty.']
    },
    army: [{
      type: Schema.Types.ObjectId,
      ref: 'Example',
      'default': []
    }]
  },
  autoLoad: true
};