
var Base = require('./base');
var Post = require('../models/post');


var Posts = Base.Collection.extend({
  model: Post
});


module.exports = Base.collection('Posts', Posts);