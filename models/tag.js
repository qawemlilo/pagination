"use strict";


var Bookshelf = require('../dbconnect')();
var Post = require('./post');


// Tag model
var Tag = Bookshelf.Model.extend({

  tableName: 'tags',

  posts: function () {
    return this.belongsToMany('Post');
  }
});


module.exports = Bookshelf.model('Tag', Tag);