

var Bookshelf = require('./dbconnect')({
  connection: {
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'juliet',
    database: process.env.DB_NAME || 'myblog',
    charset: 'utf8'
  }
});

// This solves the circular module dependency problem
Bookshelf.plugin('registry');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var path = require('path');
var router = express.Router();
var routes = require('./routes');
var API = require('./api')(router);


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

// handle api requests
app.use('/api', API);

// handle blog requests
routes.setup(app);

app.listen(3002, function() {
  console.log("✔ Express server listening on port %d in %s mode", 3002, app.get('env'));
});
