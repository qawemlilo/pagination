/**

### Categories

 - `GET    /categories`   - fetch all categories
 - `POST   /category`     - create a new category
 - `GET    /category/:id` - fetch a single category
 - `PUT    /category/:id` - update category
 - `DELETE /category/:id` - delete category

**/

var Category = require('../models/category');


module.exports = function (router) {

  router.route('/categories/:id')
    // fetch all categories
    .get(function (req, res) {
      Category.forge({id: req.params.id})
      .fetch()
      .then(function (category) {
        if(!category) {
          res.status(404).json({error: true, data: {}});
        }
        else {
          res.json({error: false, data: category.toJSON()});
        }
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })   
  
    // update a category
    .put(function (req, res) {
      Category.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (category) {
        category.save({name: req.body.name || category.get('name')})
        .then(function () {
          res.json({error: false, data: {message: 'Category updated'}});
        })
        .otherwise(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
  
    // delete a category
    .delete(function (req, res) {
      Category.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (category) {
        category.destroy()
        .then(function () {
          res.json({error: true, data: {message: 'Category successfully deleted'}});
        })
        .otherwise(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    });
};
