
var config = require('./config');
var Bookshelf = require('./dbconnect')(config);

var categoriesCollection = require('./collections/categories');
var postsCollection = require('./collections/posts');
var userModel = require('./models/user');

var faker = require('faker');
var categories = [
  {name: 'News'}, 
  {name: 'Tutorials'}, 
  {name: 'Interviews'}, 
  {name: 'Random'}
];



function randomCategory() {
  var key = Math.floor(Math.random() * 4) + 1;

  return key;
}


function createHTML() {
  var html = '<p>' + faker.hacker.phrase() + faker.hacker.phrase() + '</p>';

  html += '<p>' + faker.hacker.phrase() + faker.hacker.phrase() + '</p>';
  html += '<p>' + faker.hacker.phrase() + faker.hacker.phrase() + '</p>';

  return html;
}


function createPost(counter) {
  var post = {};

  post.title = faker.company.catchPhrase() + '-' + counter;
  post.category_id = randomCategory();
  post.user_id = 1;
  post.html = createHTML();
  post.slug = faker.helpers.slugify(post.title);

  return post;
}


function createPosts(total) {
  var posts = [];

  for (var i=0; i < total; i++) {
    posts.push(createPost(i));
  }

  return posts;
}



console.log('> seeding...');

// first create user
var user = {name: 'John', email: 'john@example.com'};

userModel.forge(user)
.save()
.then(function () {
  console.log('> user created');
  // save categories
  return new categoriesCollection(categories)
  .invokeThen('save')
  .then(function () {
    console.log('> categories created');
  });
})
.then(function () {
  // create 100 posts
  var myposts = createPosts(100);

  // save posts
  return new postsCollection(myposts)
  .invokeThen('save')
  .then(function () {
    console.log('> seeding complete!');
    process.exit(0);
  });
})
.otherwise(function (error) {
  console.error(error.stack);
  process.exit(1);
});