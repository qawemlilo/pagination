"use strict";

var Base = require('./base');
var Tag = require('../models/tag');


var Tags = Base.Collection.extend({
  model: Tag
});


module.exports =  Base.collection('Tags', Tags);