"use strict";


var Bookshelf = require('../dbconnect')();


// User model
var User = Bookshelf.Model.extend({
  tableName: 'users'
});


module.exports = Bookshelf.model('User', User);;