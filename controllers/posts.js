

var Posts = require('../collections/posts');
var Post = require('../models/post');


module.exports = {

  /*
   * GET /
  **/
  getPosts: function (req, res, next) {
    var posts = new Posts();
    var page = parseInt(req.query.p, 10);
    var limit = parseInt(req.query.limit, 10) || 2;
    var order = req.query.order || "asc";
    var currentpage = page || 1;

    var opts = {
      limit: limit,
      page: currentpage,
      order: order
    };

    posts.fetchBy('id', opts)
    .then(function (data) {
      res.render('posts', {
        title: 'Posts',
        pagination: data.pagination,
        posts: data.collection.toJSON()
      });
    })
    .otherwise(function (error) {
      console.error(error.stack);
      req.flash('errors', {'msg': error.message});
      res.redirect('/');      
    });
  },


  /*
   * GET /posts/:slug
   */
  getPost: function (req, res) {
    var slug = req.params.slug;

    return Post.forge({slug: slug})
    .fetch({
      withRelated: ['author', 'tags', 'category']
    })
    .then(function (post) {
      res.render('post', {
        title: 'Post',
        post: post.toJSON()
      });
    })
    .otherwise(function (error) {
      req.flash('errors', {'msg': error.message});
      res.redirect('/');
    });
  }

};
