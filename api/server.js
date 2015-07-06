// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./controllers/auth');

// Load controllers
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');

var port = process.env.PORT || 8080;
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ramen-stack';

// Connect to the ramen-stack MongoDB
mongoose.connect(mongoUri);

console.log('Mongoose connected to ' + mongoUri);

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
  next();
});

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

// router.route('/beers/name/:name')
//   .get(authController.isAuthenticated, beerController.getBeerByName);
//
// router.route('/beers/brewery/:brewery')
//   .get(authController.isAuthenticated, beerController.getBeerByBrewery);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/users/:username')
  .get(authController.isAuthenticated, userController.getUser);

// Register all our routes with /api
app.use('/api', router);

userController.seedAdmin();

// Start the server
app.listen(port);

console.log('API Started at http://localhost:' + port + '/');
