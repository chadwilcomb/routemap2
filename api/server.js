// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');

// Load controllers
var authController = require('./controllers/auth');
var projectController = require('./controllers/project');
var layerController = require('./controllers/layer');
var userController = require('./controllers/user');

var port = process.env.PORT || 8080;
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/routemap';

// Connect to the MongoDB
mongoose.connect(mongoUri);

console.log('Mongoose connected to ' + mongoUri);

// Create our Express application
var app = express();

app.use(cors());
// Use the body-parser package in our application
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({ limit: '50mb' }));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /layers
router.route('/layers')
  .post(authController.isAuthenticated, layerController.postLayer)
  .get(authController.isAuthenticated, layerController.getLayers);

// Create endpoint handlers for /layers/:layer_id
router.route('/layers/:layer_id')
  .get(authController.isAuthenticated, layerController.getLayer)
  .put(authController.isAuthenticated, layerController.putLayer)
  .delete(authController.isAuthenticated, layerController.deleteLayer);

// Create endpoint handlers for /projects
router.route('/projects')
  .post(authController.isAuthenticated, projectController.postProject)
  .get(authController.isAuthenticated, projectController.getProjects);

// Create endpoint handlers for /projects/:projects_id
router.route('/projects/:project_id')
  .get(authController.isAuthenticated, projectController.getProject)
  .put(authController.isAuthenticated, projectController.putProject)
  .delete(authController.isAuthenticated, projectController.deleteProject);


// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUser)
  .get(userController.getUsers);

router.route('/users/:email')
  .get(authController.isAuthenticated, userController.getUser)
  .put(authController.isAuthenticated, userController.putUser)
  .delete(authController.isAuthenticated, userController.deleteUser);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);

console.log('API Started at http://localhost:' + port + '/');
