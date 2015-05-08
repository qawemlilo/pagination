
var Base = require('./base');
var User = require('../models/user');


var Users = Base.Collection.extend({
  model: User
});


module.exports =  Base.collection('Users', Users);