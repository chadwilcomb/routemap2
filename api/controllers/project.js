// Load required packages
var Project = require('../models/project');

/**
* @apiDefine ProjectSuccess
*
* @apiSuccess {String} _id Project ID.
* @apiSuccess {String} title Project Title.
* @apiSuccess {String} description Project Description.
* @apiSuccess {string="staged","live"} state Project State.
* @apiSuccess {Object} creator User that created the Project.
* @apiSuccess {Date} created Timestamp when the Project was created.
* @apiSuccess {Object} modifier User that last modified the Project.
* @apiSuccess {Date} modified Timestamp when the Project was last modified.
*
*/

/**
* @apiDefine ProjectSuccessExample
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "_id": "55a03ba3811e0b030098f036",
*       "title": "airport_intelligence",
*       "description": "Airport Traveler Demo Application",
*       "state": "staged",
*       "layers": "[{...},{...}]",
*       "creator": {_id: "55a038daaeec1a0300b0e42d", email: "user@placeiq.com", firstName: "Plaise", lastName: "Iqueue"}
*       "created": "2015-07-10T21:36:08.797Z",
*       "creator": {_id: "55a038daaeec1a0300b0e42d", email: "anotherguy@placeiq.com", firstName: "Guy", lastName: "Hoochang"}
*       "modified": "2015-07-15T14:22:25.444Z",
*     }
*
*/

/**
 * @api {post} /api/projects Create New Project
 * @apiName PostProject
 * @apiGroup Project
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam {String} title Project Title.
 * @apiParam {String} description Project Description.
 * @apiParam {string="staged","live"} state Project State.
 *
 * @apiUse ProjectSuccess
 * @apiUse ProjectSuccessExample
 *
 */

// Create endpoint /api/projects for POSTS
exports.postProject = function(req, res) {
  // Create a new instance of the Project model
  var project = new Project();

  // Set the project properties that came from the POST data
  project.title = req.body.title;
  project.description = req.body.description;
  project.state = req.body.state;
  project.creator = project.modifier = req.user._id;

  // Save the project and check for errors
  project.save(function(err) {
    if (err)
      res.send(err);

    res.json(project);
  });
};

/**
 * @api {get} /api/projects Get All Projects
 * @apiName CreateProject
 * @apiGroup Project
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiUse ProjectSuccess
 * @apiUse ProjectSuccessExample
 *
 */
// Create endpoint /api/projects for GET
exports.getProjects = function(req, res) {

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


/**
 * @api {get} /api/projects/:project_id Get Project By Id
 * @apiName GetProject
 * @apiGroup Project
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam (URL) {String} project_id Project ID.
 *
 * @apiUse ProjectSuccess
 * @apiUse ProjectSuccessExample
 *
 */
// Create endpoint /api/projects/:project_id for GET
exports.getProject = function(req, res) {

  // Use the Project model to find a specific project
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


/**
 * @api {put} /api/projects/:project_id Update Project
 * @apiName UpdateProject
 * @apiGroup Project
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam (URL) {String} project_id Project ID.
 *
 * @apiParam {String} title Project Title.
 * @apiParam {String} description Project Description.
 * @apiParam {string="staged","live"} state Project State.
 * @apiParam {Object[]} layers List of Layer objects.
 *
 * @apiUse ProjectSuccess
 * @apiUse ProjectSuccessExample
 *
 */
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


/**
 * @api {delete} /api/projects/:project_id Delete Project
 * @apiName DeleteProject
 * @apiGroup Project
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam (URL) {String} project_id Project ID.
 *
 * @apiSuccess {String} message Success Message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Project removed"
 *     }
 */
// Create endpoint /api/projects/:project_id for DELETE
exports.deleteProject = function(req, res) {

  // Use the Project model to find a specific project and remove it
  Project.remove({ _id: req.params.project_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Project removed' });
  });
};
