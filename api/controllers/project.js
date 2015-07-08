// Load required packages
var Project = require('../models/project');

// Create endpoint /api/projects for POSTS
exports.postProject = function(req, res) {
  // Create a new instance of the Project model
  var project = new Project();

  // Set the project properties that came from the POST data
  project.title = req.body.title;
  project.description = req.body.description;
  
  project.creator = req.user._id;

  // Save the project and check for errors
  project.save(function(err) {
    if (err)
      res.send(err);

    res.json(project);
  });
};

// Create endpoint /api/projects for GET
exports.getProjects = function(req, res) {

  // Use the Project model to find all projects
  Project.find({ userId: req.user._id }, function(err, projects) {
    if (err)
      res.send(err);

    res.json(projects);
  });
};

// Create endpoint /api/projects/:project_id for GET
exports.getProject = function(req, res) {

  // Use the Project model to find a specific project
  Project.findOne({ userId: req.user._id, _id: req.params.project_id }, function(err, project) {
    if (err)
      res.send(err);

    res.json(project);
  });
};

// Create endpoint /api/projects/:project_id for PUT
exports.putProject = function(req, res) {

  // Use the Project model to find a specific project
  Project.findOneAndUpdate(
    { userId: req.user._id, _id: req.params.project_id },
    {
      brewery: req.body.brewery,
      name: req.body.name,
      type: req.body.type,
      quantity: req.body.quantity,
    },
    { new: true },
    function(err, project) {
      if (err)
        res.send(err);

    res.json(project);
  });
};

// Create endpoint /api/projects/:project_id for DELETE
exports.deleteProject = function(req, res) {

  // Use the Project model to find a specific project and remove it
  Project.remove({ userId: req.user._id, _id: req.params.project_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Project removed' });
  });
};
