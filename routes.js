

var postsController = require('./controllers/posts');

module.exports.setup = function (router) {
  router.get('/', postsController.getPosts);
  router.get('/posts/:slug', postsController.getPost);
};

