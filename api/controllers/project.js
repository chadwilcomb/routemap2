// Load required packages
var Project = require('../models/project');

// Create endpoint /api/projects for POSTS
exports.postProject = function(req, res) {
  // Create a new instance of the Project model
  var project = new Project();

  // Set the project properties that came from the POST data
  project.title = req.body.title;
  project.description = req.body.description;
  project.state = req.body.state;

  project.creator = req.user._id;
  project.modifier = req.user._id;

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
  // Project.find({}, function(err, projects) {
  //   if (err)
  //     res.send(err);
  //
  //   res.json(projects);
  // });
  Project.find()
    .populate({
      path: 'creator',
      select: 'email firstName lastName'
    })
    .populate({
      path: 'modifier',
      select: 'email firstName lastName'
    })
    .populate({
      path: 'layers',
      select: '-features'
    })
    .exec(function (err, projects) {
      if (err)
        res.send(err);

      res.json(projects);
    });
};

// Create endpoint /api/projects/:project_id for GET
exports.getProject = function(req, res) {

  // Use the Project model to find a specific project
  // Project.findOne({ _id: req.params.project_id }, function(err, project) {
  //   if (err)
  //     res.send(err);
  //
  //   res.json(project);
  // });
  Project.findOne({ _id: req.params.project_id })
    .populate({
      path: 'creator',
      select: 'email firstName lastName'
    })
    .populate({
      path: 'modifier',
      select: 'email firstName lastName'
    })
    .populate({
      path: 'layers',
      select: '-features'
    })
    .exec(function (err, project) {
      if (err)
        res.send(err);

      res.json(project);
    });
};

// Create endpoint /api/projects/:project_id for PUT
exports.putProject = function(req, res) {
  var layers = req.body.layers.map(function (layer) {
    return layer._id;
  });
  // Use the Project model to find a specific project
  Project.findOneAndUpdate(
    { _id: req.params.project_id },
    {
      title: req.body.title,
      description: req.body.description,
      state: req.body.state,
      modifier: req.user._id,
      modified: Date.now(),
      layers: layers
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
  Project.remove({ _id: req.params.project_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Project removed' });
  });
};
