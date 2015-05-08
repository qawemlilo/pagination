"use strict";


var Bookshelf = require('../dbconnect')();
var Post = require('./post');


// Category model
var Category = Bookshelf.Model.extend({

  tableName: 'categories',

  posts: function () {
    return this.hasMany('Post');
  }
});


module.exports = Bookshelf.model('Category', Category);