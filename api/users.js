/**

### Users

 - `GET    /users`    - fetch all users
 - `POST   /user`     - create a new user
 - `GET    /user/:id` - fetch a single user
 - `PUT    /user/:id` - update user
 - `DELETE /user/:id` - delete user

**/


var Users = require('../collections/users');
var User = require('../models/user');


module.exports = function (router) {

  router.route('/users')
    // fetch all users
    .get(function (req, res) {
      Users.forge()
      .fetch()
      .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
  
    // create a user
    .post(function (req, res) {
      User.forge({
        name: req.body.name,
        email: req.body.email
      })
      .save()
      .then(function (user) {
        res.json({error: false, data: {id: user.get('id')}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      }); 
    });
  
  router.route('/users/:id')
    // fetch user
    .get(function (req, res) {
      User.forge({id: req.params.id})
      .fetch()
      .then(function (user) {
        if (!user) {
          res.status(404).json({error: true, data: {}});
        }
        else {
          res.json({error: false, data: user.toJSON()});
        }
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
  
    // update user details
    .put(function (req, res) {
      User.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (user) {
        user.save({
          name: req.body.name || user.get('name'),
          email: req.body.email || user.get('email')
        })
        .then(function () {
          res.json({error: false, data: {message: 'User details updated'}});
        })
        .otherwise(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
  
    // delete a user
    .delete(function (req, res) {
      User.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (user) {
        user.destroy()
        .then(function () {
          res.json({error: true, data: {message: 'User successfully deleted'}});
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
