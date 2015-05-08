"use strict";


var Bookshelf = require('../dbconnect')();
var Category = require('./category');
var Tag = require('./tag');
var User = require('./user');

// Post model
var Post = Bookshelf.Model.extend({

  tableName: 'posts',

  hasTimestamps: true,

  category: function () {
    return this.belongsTo('Category', 'category_id');
  },

  tags: function () {
    return this.belongsToMany('Tag');
  },

  author: function () {
    return this.belongsTo('User');
  }
});


module.exports = Bookshelf.model('Post', Post);